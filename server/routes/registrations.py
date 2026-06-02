from flask import Blueprint, request, jsonify, g
from middleware.auth import auth_required
from db import get_db_connection

registrations_bp = Blueprint('registrations', __name__)

@registrations_bp.route('/api/register', methods=['POST'])
@auth_required
def register_for_event():
    if g.user['role'] != 'student':
        return jsonify({'error': 'Admins cannot register for events'}), 403
        
    data = request.get_json()
    if not data or 'event_id' not in data:
        return jsonify({'error': 'Missing event_id'}), 400
        
    event_id = data['event_id']
    student_id = g.user['user_id']
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database error'}), 500
        
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT e.max_capacity, COUNT(r.id) as registered_count 
            FROM events e 
            LEFT JOIN registrations r ON e.id = r.event_id 
            WHERE e.id = %s 
            GROUP BY e.id
        """, (event_id,))
        event = cursor.fetchone()
        
        if not event:
            return jsonify({'error': 'Event not found'}), 404
            
        if event['registered_count'] >= event['max_capacity']:
            return jsonify({'error': 'Event is full'}), 400
            
        cursor.execute(
            "INSERT INTO registrations (student_id, event_id) VALUES (%s, %s)",
            (student_id, event_id)
        )
        conn.commit()
        return jsonify({'message': 'Registered successfully'}), 201
        
    except Exception as e:
        if '1062' in str(e) or 'Duplicate entry' in str(e):
            return jsonify({'error': 'You are already registered for this event'}), 409
        return jsonify({'error': str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@registrations_bp.route('/api/my-registrations', methods=['GET'])
@auth_required
def my_registrations():
    if g.user['role'] != 'student':
        return jsonify({'error': 'Only students have registrations'}), 403
        
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database error'}), 500
        
    try:
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT e.id, e.name, DATE_FORMAT(e.event_date, '%Y-%m-%d') as event_date, e.venue 
            FROM registrations r
            JOIN events e ON r.event_id = e.id
            WHERE r.student_id = %s
            ORDER BY e.event_date ASC
        """
        cursor.execute(query, (g.user['user_id'],))
        registrations = cursor.fetchall()
        return jsonify(registrations), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()
