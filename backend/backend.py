import json
import time
import re
from flask import Flask, Response, request
from flask_cors import CORS
from jsonschema import validate
from jsonschema.exceptions import ValidationError

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

schema = {
    "type" : "object",
    "properties" : {
        "email" : {
            "type" : "string",
            "minLength": 5,
            "pattern": "^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$",
        },
        "company_id": {
            "type": "string",
            "pattern": "[0-9a-f]{8}-?[0-9a-f]{4}-?4[0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}"
        },
        "first_name" : {"type" : "string", "minLength": 2},
        "last_name" : {"type" : "string", "minLength": 2},
        "password" : {"type" : "string", "minLength": 8},
        "notificationsProject_finish" : {"type" : "boolean"},
        "notificationsUpdates" : {"type" : "boolean"},
    },
    "required": [
        "first_name", "last_name",
        "password", "notificationsProject_finish", "notificationsUpdates"],
    "additionalProperties": False
}


ALREADY_REGISTERED_USERS_STORE = []


@app.route('/api/onboarding/', methods=["POST"])
def submit_user_data():

    data = request.json
    try:
        validate(instance=data, schema=schema)
    except ValidationError as exc:
        return Response(
            response=json.dumps({"code": "bad_request", "detail": exc.message}),
            status=400,
            content_type="application/json"
        )

    if data["first_name"] in ALREADY_REGISTERED_USERS_STORE:
        return Response(
            response=json.dumps({
                "code": "token_expired",
                "detail": "Token expired. User is already registered."
            }),
            status=400,
            content_type="application/json"
        )

    ALREADY_REGISTERED_USERS_STORE.append(data["first_name"])
    
    return Response(
        response=json.dumps("OK"), status=200, content_type="application/json"
    )