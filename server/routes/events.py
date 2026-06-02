from flask import Blueprint, request, jsonify, g
from middleware.auth import auth_required
from db import get_db_connection

events_bp = Blueprint('events', __name__)

@events_bp.route('/api/events', methods=['GET'])
@auth_required
def get_events():
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database error'}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT e.id, e.name, DATE_FORMAT(e.event_date, '%Y-%m-%d') as event_date, e.venue, e.max_capacity,
                   COUNT(r.id) as registered_count,
                   (COUNT(r.id) / e.max_capacity) * 100 as fill_percent
            FROM events e
            LEFT JOIN registrations r ON e.id = r.event_id
            GROUP BY e.id
            ORDER BY e.event_date ASC
        """
        cursor.execute(query)
        events = cursor.fetchall()
        for ev in events:
            ev['fill_percent'] = float(ev['fill_percent']) if ev['fill_percent'] is not None else 0.0
            ev['registered_count'] = int(ev['registered_count'])
        return jsonify(events), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@events_bp.route('/api/events', methods=['POST'])
@auth_required
def create_event():
    if g.user['role'] != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
        
    data = request.get_json()
    if not data or not all(k in data for k in ('name', 'event_date', 'venue', 'max_capacity')):
        return jsonify({'error': 'Missing required fields'}), 400
        
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database error'}), 500
    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO events (name, event_date, venue, max_capacity, created_by) VALUES (%s, %s, %s, %s, %s)",
            (data['name'], data['event_date'], data['venue'], data['max_capacity'], g.user['user_id'])
        )
        conn.commit()
        return jsonify({'message': 'Event created', 'event_id': cursor.lastrowid}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@events_bp.route('/api/events/<int:event_id>/registrations', methods=['GET'])
@auth_required
def get_event_registrations(event_id):
    if g.user['role'] != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
        
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database error'}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT u.id as student_id, u.full_name, u.username, r.registered_at
            FROM registrations r
            JOIN users u ON r.student_id = u.id
            WHERE r.event_id = %s
            ORDER BY r.registered_at ASC
        """
        cursor.execute(query, (event_id,))
        registrations = cursor.fetchall()
        for r in registrations:
            r['registered_at'] = r['registered_at'].isoformat() if r['registered_at'] else None
        return jsonify(registrations), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()
