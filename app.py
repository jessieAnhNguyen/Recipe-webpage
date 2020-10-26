from flask import Flask, render_template, request, redirect, url_for, flash
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ingredients.db'
#Initialize the database
db = SQLAlchemy(app)
migrate = Migrate(app, db)

#Create db model
class Ingredients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ingredient = db.Column(db.String(), nullable=False)

    #Create a function to return a string
    def __repr__(self):
        return '<Name %r>' % self.id


application = app
app.config['SECRET_KEY'] = 'hard to guess string'

bootstrap = Bootstrap(app)
moment = Moment(app)


class IngredientForm(FlaskForm):
    ingredient = StringField('Enter a new ingredient:', validators=[DataRequired()])
    submit = SubmitField('Add it!')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500


@app.route('/', methods=['GET', 'POST'])
def index():
    ingredient = None
    form = IngredientForm()
    if request.method == "POST":
        ingredient = request.form['ingredient']
        new_ingredient = Ingredients(ingredient=ingredient)

        #Push to database
        db.session.add(new_ingredient)
        db.session.commit()
        flash('You successfully added a new ingredient ', 'success')
        return redirect(url_for('index'))

    else:
        ingredientList = Ingredients.query
        return render_template('index.html', form=form, ingredientList = ingredientList)
    
@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
    ingredient_to_update = Ingredients.query.get_or_404(id)
    if request.method=="POST":
        ingredient_to_update.ingredient = request.form['ingredient_name']
        #Push to database
        try:
            db.session.commit()
            flash('You successfully updated the ingredient ', 'success')
            return redirect(url_for('index'))

        except:
            flash('There was an error updating the ingredient ', 'error')
            return "There was a problem updating that ingredient"
    else:
        return render_template('update.html', ingredient_to_update= ingredient_to_update)

@app.route('/delete/<int:id>', methods=['GET'])
def delete(id):
    ingredient_to_delete = Ingredients.query.get_or_404(id)
    try:
        #Delete from database
        db.session.delete(ingredient_to_delete)
        db.session.commit()
        flash('You successfully deleted the ingredient ', 'success')
        return redirect(url_for('index'))
    
    except:
        flash('There was an error deleting the ingredient ', 'error')
        return "There was a problem deleting that ingredient"