from flask import Flask, render_template

app = Flask(__name__)

#########################################
# main
#########################################
@app.route('/')
def index():
    return render_template('index.html')

#########################################
# definisi
#########################################
@app.route('/definisi')
def definisi():
    return render_template('definisi.html')

#########################################
# tips
#########################################
@app.route('/tips')
def tips():
    return render_template('tips.html')

@app.route('/pen')
def pen():
    return render_template('pen.html')

@app.route('/men')
def men():
    return render_template('men.html')

@app.route('/ber')
def ber():
    return render_template('ber.html')

@app.route('/ter')
def ter():
    return render_template('ter.html')

#########################################
# ujian
#########################################
@app.route('/ujian')
def ujian():
    return render_template('ujian.html')

#########################################
# permainan
#########################################
@app.route('/permainan')
def permainan():
    return render_template('permainan.html')

@app.route('/cari_perkataan')
def cari_perkataan():
    return render_template('cari_perkataan.html')

@app.route('/padanan_kata')
def padanan_kata():
    return render_template('padanan_kata.html')

if __name__ == '__main__':
    app.run(debug=True)
