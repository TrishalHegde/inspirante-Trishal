from functools import wraps
from flask import request, jsonify, g
import jwt
import os

def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Unauthorized: Missing or invalid token'}), 401
        
        token = auth_header.split(' ')[1]
        try:
            secret = os.getenv('JWT_SECRET', 'fallback_secret')
            decoded = jwt.decode(token, secret, algorithms=['HS256'])
            g.user = decoded
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Unauthorized: Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Unauthorized: Invalid token'}), 401
            
        return f(*args, **kwargs)
    return decorated
