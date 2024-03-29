from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/About')  # Route for the about page
def about():
    return render_template('About.html')


if __name__ == '__main__':
    app.run(debug=True)
