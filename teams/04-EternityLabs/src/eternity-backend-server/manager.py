  
from eternity_backend_server import create_app, manager_thread_jobs
from flask_script import Manager, Server, Shell
from eternity_backend_server.extensions import db
import click
from eternity_backend_server.blueprints.datamin.models import DATAMINFLAG, DATAMIN


app = create_app()

banner = r"""

 ____       __                                      __
/\  _`\    /\ \__                            __    /\ \__
\ \ \L\_\  \ \ ,_\     __    _ __    ___    /\_\   \ \ ,_\   __  __
 \ \  _\L   \ \ \/   /'__`\ /\`'__\/' _ `\  \/\ \   \ \ \/  /\ \/\ \
  \ \ \L\ \  \ \ \_ /\  __/ \ \ \/ /\ \/\ \  \ \ \   \ \ \_ \ \ \_\ \
   \ \____/   \ \__\\ \____\ \ \_\ \ \_\ \_\  \ \_\   \ \__\ \/`____ \
    \/___/     \/__/ \/____/  \/_/  \/_/\/_/   \/_/    \/__/  `/___/> \
                                                                 /\___/
                                                                 \/__/

"""

manager = Manager(app)


def make_shell_context():
    return {
        "app": app,
    }

# manager.add_command("runserver", Server(host="127.0.0.1", port=5000, use_debugger=False))
manager.add_command("shell", Shell(banner=banner, make_context=make_shell_context))


@manager.command
def runserver(host="127.0.0.1", port=5000, use_debugger=False):
    manager_thread_jobs(app)
    app.run(host=host, port=port, debug=use_debugger)


@manager.command
def init_db():
    """Initialized local databases."""
    db.create_all()
    click.echo('Initialized local database.')

@manager.command
def init_flag():
    init_flag = DATAMINFLAG(id=1, flag=0)
    db.session.add(init_flag)
    db.session.commit()
    click.echo('Initialized DataMin FLAG.')


@manager.command
def init_data():
    data = DATAMIN(id=1, type="", datalist=[{"a": "b"}])
    db.session.add(data)
    db.session.commit()
    click.echo("Initialized DataMin data.")

@manager.command
def init_datamin():
    init_flag()
    init_data()

@manager.command
def init_all():
    init_db()

    init_flag()
    init_data()

@manager.command
def reset_all():
    """Reset server databases."""
    click.confirm('This operation will delete the database, do you want to continue?', abort=True)
    db.drop_all()
    click.echo('Drop tables.')
    db.create_all()
    click.echo('Success create databases.')
    click.echo('Reset database.')

    init_db()
    init_flag()
    init_data()


if __name__ == "__main__":
    manager.run()
