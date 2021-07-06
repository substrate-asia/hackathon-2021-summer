from eternity_backend_server.extensions import db

class DATAMIN(db.Model):
    __tablename__ = "datamin"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(22), nullable=False)
    datalist = db.Column(db.JSON, nullable=False)

class DATAMINFLAG(db.Model):
    __tablename__ = "dataminflag"

    id = db.Column(db.Integer, primary_key=True)
    flag = db.Column(db.Integer, default=0, nullable=False)