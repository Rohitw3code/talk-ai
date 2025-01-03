"""
Routes for model selection and configuration
"""
from flask import Blueprint, request, jsonify
from config.models import MODELS, DEFAULT_MODEL
from services.groq_service import groq_service
import logging

logger = logging.getLogger(__name__)
model_bp = Blueprint('model', __name__)

@model_bp.route('/selected-model', methods=['POST'])
def set_selected_model():
    try:
        data = request.json
        model_id = data.get('modelId')
        
        if not model_id:
            return jsonify({'error': 'No model ID provided'}), 400
            
        # Validate model ID
        valid_model_ids = [model['id'] for model in MODELS.values()]
        if model_id not in valid_model_ids:
            return jsonify({'error': 'Invalid model ID'}), 400
            
        # Update the model in the service
        groq_service.set_model(model_id)
        
        return jsonify({'message': 'Model updated successfully', 'modelId': model_id}), 200
        
    except Exception as e:
        logger.error(f"Error setting model: {str(e)}")
        return jsonify({'error': str(e)}), 500