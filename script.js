function preload() {
    this.load.image('duende', 'assets/duende_verde_stance.png');
    this.load.image('background', 'assets/fundo.png');
    this.load.spritesheet('duende_andando', 
        'assets/Duende_Verde_Stance_andando1.png',
        { frameWidth: 70, frameHeight: 100 }
    );
  this.load.spritesheet('duende_andando_esquerda',                  'assets/Duende_Verde_Stance_andandoLeft.png',                 {frameWidth:70, frameHeight: 100}            );
}

function create() {
    //add images
    this.add.image(100,100, 'background').setScale(2, 2);
    //this.cameras.main.setBounds(0, 0, 3392, 100);
    this.cameras.main.setBounds(0, 0, 506 * 2, 181);
    for (let x = 0; x < 1; x++)
   {
          this.add.image(1012 * x, 0,      'background').setOrigin(0);
   }
  
  //criando plataforma para adicionar pulo
  //platforms = this.physics.add.staticGroup();
  //platforms.create(1012, 100).setScale(2).refreshBody();

    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

  
    this.physics.world.setBounds(0, 0, 1200, 240);
    player = this.physics.add.sprite(50, 100, 'duende');

    this.cameras.main.startFollow(player, true);
    this.cameras.main.setZoom(2);
  
  
 // Animation set
       this.anims.create({
    key: 'left',
    frames:        this.anims.generateFrameNumbers('duende_andando_esquerda', {     start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
});
  this.anims.create({
    key: 'turn',
    frames: [ { key: 'duende_andando', frame: 0 } ],
    frameRate: 10
});
 this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('duende_andando', { start: 1, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'a',
    frames: this.anims.generateFrameNumbers('duende_andando', { start: 1, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  
  
}

function update() {
   const cam = this.cameras.main;
  if (this.moveCam)
        {
            if (this.cursors.left.isDown)
            {
                cam.scrollX -= 4;
            }
            else if (this.cursors.right.isDown)
            {
                cam.scrollX += 4;
            }

            if (this.cursors.up.isDown)
            {
                cam.scrollY -= 4;
            }
            else if (this.cursors.down.isDown)
            {
                cam.scrollY += 4;
            }
        }
  else{
    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else if (this.a.isDown){
      player.anims.play('a',true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
  }
}  

var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 300,
    scale:{
      mode:Phaser.Scale.FIT
    },
  
    backgroundColor: '#ceedeb',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var moveCam = false;
var game = new Phaser.Game(config);