# -*- coding: utf-8 -*-
from flask import (
    Blueprint,
    current_app,
    flash,
    redirect,
    render_template,
    request,
    url_for,
    abort
)
from flask_login import login_required, login_user, logout_user, current_user
from eternity_backend_server.utils import flash_errors, redirect_back
from eternity_backend_server.extensions import db

admin_bp = Blueprint("admin", __name__)
