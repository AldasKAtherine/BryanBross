// Manejar Medu

const UP_ARROW = 38;
const DOWN_ARROW = 40;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const SPACE = 32;
const ENTER = 13;
const F1 = 112;
const ESC = 27;

var selectedItem = 0;
var menuLengt = 2;

var selectedLevel = 1;
var passedLevels = [0];
var maxPassedLevel = 0;
var passedLevelsInfo = [];

const Screens = {
  MAIN: "main-screen",
  PLAY: "play-screen",
  CONTROLS: "controls-screen",
  RESUEM: "resume-screen",
  LEVELS: "levels-screen"
};

var actualScreen = Screens.MAIN;

goToSreeen(actualScreen);

function changeMainMenu(delta) {
  selectedItem += delta;
  if (selectedItem < 0) selectedItem = 0;
  if (selectedItem == menuLengt) selectedItem = menuLengt - 1;

  $("#main-screen .selected-item").removeClass("selected-item");
  $("#menu li").each(function(index) {
    if (index == selectedItem) $(this).addClass("selected-item");
  });
}

function goToSreeen(screenToShow) {
  Object.values(Screens).forEach(screen => {
    $(`#${screen}`).hide();
  });

  $(`#${screenToShow}`).show();

  actualScreen = screenToShow;
  console.log(actualScreen);
}

function getPageForIndexMenu(index) {
  if (index == 0) return Screens.LEVELS;
  if (index == 1) return Screens.CONTROLS;
}

function generateLevelsGrids() {
  let gridS = 4;
  let html = "";

  let actualRow = 0;

  let rowLevels = [{}];
  let nivel = 1;

  console.log(rowLevels);

  while (rowLevels.length > 0) {
    console.log(maxPassedLevel);

    rowLevels = niveles.slice(actualRow * gridS, (actualRow + 1) * gridS);

    let htmlInter = "";
    rowLevels.map((levl, i) => {


      let levelInfo =  passedLevelsInfo.find((l)=>{
        return l.nivel == nivel;
      });

      console.log({levelInfo});
      

      htmlInter += `
                  <div style="display:inline-block;">
      
                    <div class="sur-level ${
                      selectedLevel == nivel ? "level-selected" : "level-no-selected"
                    }">
                      <div class="con-level ${
                        passedLevels.includes(nivel) ? "passed" : "no-passed"
                      }"
                       style="opacity: ${nivel > maxPassedLevel ? "0.5" : "1"}"
                      >
                        <p style="margin: 0px;">${nivel}</p>
                      </div>
                    </div>
                    <div>
                        <span style="margin-bottom: 1em; ${levelInfo != undefined ? '' : 'opacity: 0'} ">
                          ${levelInfo != undefined ? levelInfo.score : ""}
                          <img style="display: inline-block;    margin: 0px 4px;" src="./images/star.svg" class="star-menu" />
                        </span>
                    </div>
                  </div>
                    
                    `;

      nivel++;
    });

    html += `
               <div class="row-levels">
               ${htmlInter}
               </div>
            `;

    actualRow++;
  }

  console.log(html);

  $("#grid-container").html(html);
}

generateLevelsGrids();

// // KEYBOARD EVENTS

document.onkeydown = function(e) {
  e = e || window.event;

  if (actualScreen == Screens.MAIN) {
    switch (e.keyCode) {
      case UP_ARROW:
        changeMainMenu(-1);
        break;
      case DOWN_ARROW:
        changeMainMenu(1);
        break;
      case ENTER:
        goToSreeen(getPageForIndexMenu(selectedItem));
        if (getPageForIndexMenu(selectedItem) == Screens.PLAY) empezarJuego();
        break;
      case F1:
        //goToSreeen(Screens.CONTROLS);
        var win = window.open('https://firebasestorage.googleapis.com/v0/b/bryan-bross.appspot.com/o/MANUAL-BRYAN-BROSS.pdf?alt=media&token=ffc663f2-de29-4aea-97f6-ae6658f71503', '_blank');
        win.focus();
    }
  } else if (actualScreen == Screens.LEVELS) {
    console.log(e.keyCode);

    switch (e.keyCode) {
      case UP_ARROW:
        selectedLevel -= 4;
        if (selectedLevel < 1) selectedLevel = 1;
        generateLevelsGrids();
        break;
      case DOWN_ARROW:
        changeMainMenu(1);
        selectedLevel += 4;
        if (selectedLevel > niveles.length) selectedLevel += 4;
        generateLevelsGrids();
        break;
      case RIGHT_ARROW:
        selectedLevel++;
        if (selectedLevel > niveles.length) selectedLevel = niveles.length;
        generateLevelsGrids();
        break;
      case LEFT_ARROW:
        selectedLevel--;
        if (selectedLevel < 1) selectedLevel = 1;
        generateLevelsGrids();
        break;
      case ENTER:
        if (selectedLevel > 0 && selectedLevel <= niveles.length) {
          if (selectedLevel > Math.max(...passedLevels) + 1) {
            alert("NIVEL BLOQUEADO");
          } else {
            goToSreeen(Screens.PLAY);
            empezarJuego(selectedLevel - 1);
          }
        }
        break;
      case ESC:
        goToSreeen(Screens.MAIN);
        levevelInfoUpdate();
        break;
      case F1:
          //goToSreeen(Screens.CONTROLS);
          var win = window.open('https://firebasestorage.googleapis.com/v0/b/bryan-bross.appspot.com/o/MANUAL-BRYAN-BROSS.pdf?alt=media&token=ffc663f2-de29-4aea-97f6-ae6658f71503', '_blank');
          win.focus();
    }
  } else if (actualScreen == Screens.CONTROLS) {
    switch (e.keyCode) {
      case ENTER:
        goToSreeen(Screens.MAIN);
        break;
      case SCAPE:
        goToSreeen(Screens.MAIN);
    }
  } else if (actualScreen == Screens.PLAY) {

    switch (e.keyCode) {
      case F1:
        //goToSreeen(Screens.CONTROLS);
        var win = window.open('https://firebasestorage.googleapis.com/v0/b/bryan-bross.appspot.com/o/MANUAL-BRYAN-BROSS.pdf?alt=media&token=ffc663f2-de29-4aea-97f6-ae6658f71503', '_blank');
        win.focus();
    }
    
  } else if (actualScreen == Screens.RESUEM) {
    switch (e.keyCode) {
      case ENTER:
        goToSreeen(Screens.MAIN);
        break;
    }
  }
};

// BASE Y AUTENTICACION
var firebaseConfig = {
  apiKey: "AIzaSyDiLe2lSgJ4ARZlCIGXsaVQ64VKmYpUwC4",
  authDomain: "bryan-bross.firebaseapp.com",
  databaseURL: "https://bryan-bross.firebaseio.com",
  projectId: "bryan-bross",
  storageBucket: "",
  messagingSenderId: "166962808691",
  appId: "1:166962808691:web:0e5a8f240c71d7d6"
};

var server = firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();
var uid;

var mejorEst = 0;
var mejorMuer = 0;
var mejorScore = 0;

auth
  .signInAnonymously()
  .then(cre => {
    console.log({ cre });
    uid = cre.user.uid;
    db.collection("users")
      .doc(cre.user.uid)
      .set({
        ultimoInicio: new Date(),
        info: {
          displayName: cre.user.displayName,
          email: cre.user.email
        }
      });
      cargarInfoBase();
   
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });


function cargarInfoBase(){
  db.collection("plays")
  .where("uid", "==", uid)
  .orderBy("date", "desc")
  .get()
  .then(res => {
    passedLevelsInfo = res.docs.map(play => ({
      nivel: play.data()["nivel"],
      muertes: play.data()["muertes"],
      score: play.data()["score"],
      date:  play.data()["date"],
    }));


    console.log('====================================');
    console.log(passedLevelsInfo);
    console.log('====================================');

    levevelInfoUpdate();

    generateLevelsGrids();
  });
}

function levevelInfoUpdate() {
  if (passedLevelsInfo.length == 0) passedLevelsInfo = [{ nivel: 0 }];
  passedLevels = passedLevelsInfo.map(l => l.nivel);

  console.log(passedLevels);
  maxPassedLevel = Math.max(...passedLevels) + 1;
  selectedLevel = maxPassedLevel;
}

function empezarJuego(nivel) {
  // Inicializacion
  var Q = Quintus()
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
    //.setup({ maximize: true })
    .setup({
      width: 768, // Set the default width to 800 pixels
      height: 480,
      scaleToFit: true
      //maximize: true
    })
    .controls()
    .touch();

  var blackMode = false; // EStilo de la plantalla
  let muertes = 0;
  let estrellas = 0;
  Q.input.keyboardControls();
  Q.input.joypadControls();

  // Caja
  Q.Sprite.extend("Box", {
    // Tipos Q.SPRITE_DEFAULT y Q.SPRITE_ENEMY
    init: function(p) {
      this._super(p, {
        tipo: 1,
        z: 1
      });

      this.p.type = this.p.tipo == 0 ? Q.SPRITE_DEFAULT : Q.SPRITE_ENEMY;

      let ax = this.p.w;
      let ay = this.p.h;

      this.p.points = [[0, 0], [ax, 0], [ax, ay], [0, ay]];
    },

    draw: function(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.p.tipo == 1 ? "#444444" : "#EEEEEE";
      ctx.fillRect(this.p.cx, this.p.cy, this.p.w, this.p.h);
    }
  });

  Q.Sprite.extend("Bryan", {
    init: function(p) {
      this._super(p, {
        tipo: 1,
        sheet: "bryanB",
        sprite: "bryanB",
        frame: 0,
        w: 40,
        h: 58,
        cx: 0,
        z: 2,
        speed: 360,
        cy: 0
      });

      this.add("2d, platformerControls, animation");

      Q.input.on("fire", this, function() {
        blackMode = !blackMode;
        cambiarModo(blackMode);
        this.p.collisionMask = blackMode ? Q.SPRITE_DEFAULT : Q.SPRITE_ENEMY;
        this.p.sheet = blackMode ? "bryanW" : "bryanB";
        this.p.stripe = blackMode ? "bryanW" : "bryanB";
      });
      Q.input.on("up", this, function() {
        if (this.p.vy == 0) this.p.vy = -5000;
      });
      this.p.collisionMask = blackMode ? Q.SPRITE_DEFAULT : Q.SPRITE_ENEMY;
      let ax = this.p.w;
      let ay = this.p.h;

      this.p.points = [[0, 0], [ax, 0], [ax, ay], [0, ay]];
    },
    step: function(dt) {
      if (this.p.vx > 0) {
        this.play("run_right");
        console.log("derecha");
      } else if (this.p.vx < 0) {
        this.play("run_left");
      } else {
        console.log("d:" + this.p.direction);

        let anim = `stand_${this.p.direction}`;

        this.play(anim);
      }

      if (this.p.y > 480) {
        blackMode = false;
        cambiarModo(blackMode);
        Q.stageScene("level");
        muertes++;
        if(muertes == 5){
          
          alert('PERDISTE');
          cambiarModo(false);
          Q.stageScene(null);
          $("#quintus_container").remove();
          goToSreeen(Screens.LEVELS);
          generateLevelsGrids();
        }
          
        window.textoMuerte.p.label = `Muertes: ${muertes}`;
      }
    }
  });

  Q.Sprite.extend("Premio", {
    init: function(p) {
      this._super(p, {
        tipo: 1,
        type: Q.SPRITE_ALL,
        asset: "starB.png",
        collisionMask: Q.SPRITE_ALL
      });

      Q.input.on("fire", this, function() {
        this.p.asset = blackMode ? "starW.png" : "starB.png";
      });

      this.on("hit", function(colision) {
        if (colision.obj.isA("Bryan")) {
          console.log("GANASTE");
          passedLevelsInfo.push({
            nivel: nivel + 1,
            muertes: muertes,
            score: 5 - muertes,
            uid: uid
          });
          levevelInfoUpdate();

          generateLevelsGrids();
          db.collection("plays").add({
            nivel: nivel + 1,
            muertes: muertes,
            score: 5 - muertes,
            uid: uid,
            date: new Date()
          }).then(()=>{
            cargarInfoBase();
          });

          nivel += 1;
          if (nivel < niveles.length) {
            blackMode = false;
            muertes = 0;
            estrellas++;
            cambiarModo(blackMode);
            Q.stageScene("level");
          } else {
            cambiarModo(false);
            Q.stageScene(null);
            $("#quintus_container").remove();

            goToSreeen(Screens.RESUEM);
            estrellas++;
            let playScore = estrellas / muertes;
            console.log({ playScore, mejorScore });

            console.log({ mejorEst, mejorMuer });

            if (playScore > mejorScore) {
              console.log("NUEVO MEJOR");
              mejorEst = estrellas;
              mejorMuer = muertes;
              $("#estre-res").html(
                `<img style="display: inline-block;" src="./images/star.svg" class="star-menu" />Nivel: ${nive +
                  1}`
              );

              $("#muer-res").html(
                `<img style="display: inline-block;" src="./images/cal.png" class="star-menu" />Muertes: ${muertes}`
              );
            } else {
              console.log("ANTE MEJOR");

              $("#titulo-res").html("Tu mejor puntuacion fue");
              $("#estre-res").html(
                `<img style="display: inline-block;" src="./images/star.svg" class="star-menu" />Nivel: ${nivel +
                  1}`
              );

              $("#muer-res").html(
                `<img style="display: inline-block;" src="./images/cal.png" class="star-menu" />Muertes: ${mejorMuer}`
              );
            }

            db.collection("plays").add({
              estrellas: estrellas,
              muertes: muertes,
              score: estrellas / muertes,
              uid: uid
            });
          }
        }
      });
      let ax = this.p.w;
      let ay = this.p.h;

      this.p.points = [[0, 0], [ax, 0], [ax, ay], [0, ay]];
    }
  });

  // Escenario

  Q.scene("level", function(stage) {
    let nivelData = niveles[nivel];
    let bryanPosition = nivelData[0];
    let celPosition = nivelData[1];
    let bloques = nivelData[2];

    window.bryan = new Q.Bryan({
      x: bryanPosition[0],
      y: bryanPosition[1],
      collisionMask: 1
    });
    stage.insert(bryan);

    bloques.forEach(box => {
      stage.insert(
        new Q.Box({
          x: box[0],
          y: box[1],
          w: box[2],
          h: box[3],
          cx: 0,
          cy: 0,
          tipo: box[4]
        })
      );
    });

    window.premio = new Q.Premio({
      x: celPosition[0],
      y: celPosition[1],
      w: celPosition[2],
      h: celPosition[3],
      cx: 0,
      cy: 0
    });

    stage.insert(premio);
    window.textoMuerte = new Q.UI.Text({
      x: 40,
      y: 30,
      label: `Muertes: ${muertes}`,
      size: 12,
      color: "#E883E8"
    });
    stage.insert(textoMuerte);
    window.textoEstrellas = new Q.UI.Text({
      x: 40,
      y: 10,
      label: `Nivel: ${nivel + 1}`,
      size: 12,
      color: "#E883E8"
    });
    stage.insert(textoEstrellas);

    window.textoSalir = new Q.UI.Text({
      x: 768 / 2,
      y: 460,
      label: `SALIR: ESC`,
      size: 12,
      color: "#E883E8"
    });
    stage.insert(textoSalir);

    Q.input.on("esc", stage, function() {
      cambiarModo(false);
      Q.stageScene(null);
      $("#quintus_container").remove();

      goToSreeen(Screens.MAIN);
    });
  });

  // CALLBACK DEL LOAD

  Q.load("bryan.png, bryanW.png, starB.png, starW.png, bryan.json", function() {
    Q.sheet("bryanB", "bryan.png", { tilew: 40, tileh: 58 });
    Q.sheet("bryanW", "bryanW.png", { tilew: 40, tileh: 58 });

    Q.animations("bryanB", {
      run_right: { frames: [0, 1, 2, 3], rate: 1 / 8, loop: true },
      run_left: { frames: [4, 5, 6, 7], rate: 1 / 8, loop: true },
      stand_right: { frames: [0], rate: 1 / 5 },
      stand_left: { frames: [4], rate: 1 / 5 }
    });
    Q.animations("bryanW", {
      run_right: { frames: [0, 1, 2, 3], rate: 1 / 8, loop: true },
      run_left: { frames: [4, 5, 6, 7], rate: 1 / 8, loop: true },
      stand_right: { frames: [0], rate: 1 / 5 },
      stand_left: { frames: [4], rate: 1 / 5 }
    });

    Q.stageScene("level");
  });
}

function cambiarModo(modoOscuro) {
  if (modoOscuro) document.getElementById("quintus").classList.add("oscuro");
  else document.getElementById("quintus").classList.remove("oscuro");

  if (modoOscuro)
    document.getElementsByTagName("body")[0].classList.add("oscuro");
  else document.getElementsByTagName("body")[0].classList.remove("oscuro");
}
