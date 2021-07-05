# -*- coding: utf-8 -*-
"""Public section, including homepage and signup."""
from flask import (
    Blueprint,
    current_app,
    flash,
    redirect,
    render_template,
    request,
    url_for,
    render_template_string
)
from flask_login import login_required, login_user, logout_user, current_user
from eternity_backend_server.utils import flash_errors, redirect_back
from eternity_backend_server.extensions import db, csrf_protect

public_bp = Blueprint("public", __name__, static_folder="../static")

@public_bp.route("/", methods=["GET", "POST"])
# @login_required
def home():
    """Home page."""
    return render_template("public/home.html")

@public_bp.route("/about/")
def about():
    """About page."""
    return render_template("public/about.html")