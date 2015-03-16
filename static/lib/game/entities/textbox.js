ig.module(
    
    'game.entities.textbox'
    
)

.requires(
    
    'impact.entity',
    'impact.font'
    
)

.defines(function() {
    
    EntityTextbox = ig.Entity.extend ({
        
    _wmDrawBox: true,
    _wmBoxColor: 'rgba(200, 0, 0, 0.7)',
    size: {x: 24, y: 32},
    
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    health: 50,
    zIndex: -10,
    gravityFactor: 0,
    
    textfont: new ig.Font( 'media/04b03.font.png'),
    text:'', // set in Weltmeister
    print: [],
    realprint: '',
    printc: 0,
    linec: 0,
        
    duration: 5,
    durationTimer: null,
    nextEmit: null,
    
    
    init: function( x, y, settings ) {
    
        this.parent( x, y, settings );
        this.durationTimer = new ig.Timer();
        this.nextEmit = new ig.Timer();
        
        
    },
    
    triggeredBy: function( entity, trigger ) {
        this.durationTimer.set( this.duration );
        this.nextEmit.set( 0 );
    },
    
    writetext: function() {
        
    var x = ig.system.width/2,
    y = ig.system.height/2 - 40;
    
    var canx = ig.system.getDrawPos( x ),
    cany = ig.system.getDrawPos( y ),
    rectw = this.textfont.widthForString( this.realprint ) * 2,
    recth = this.textfont.heightForString( this.realprint ) * 2;
    
        
    if( this.durationTimer.delta() < 0 && this.nextEmit.delta() >= 0 ) {
        
        ig.system.context.fillRect( canx, cany, rectw + 2, recth + 2 );
        
        var text = this.text;
                
        this.print = text.split("");
        
        var i = 0;
            
        while ( i < 1 ) {
            if ( this.printc <= this.print.length && this.realprint.length <= this.print.length ) {
        
                this.realprint = this.realprint + this.print[this.printc];
                this.printc = this.printc + 1;
                this.linec = this.linec + 1;
                i = i + 1;
                
                if ( this.linec >= this.size.x && this.realprint.charAt(this.realprint.length-1) == " " ) { // line break problem manually solved.
                    
                    this.realprint = this.realprint + '\n';
                    this.linec = 0;
                }
            
            } else {
                this.printc = 0;
                this.linec = 0;
                break;
            }
        } 
            
        this.textfont.draw ( this.realprint, x + 2, y + 2, ig.Font.ALIGN.LEFT );
                
    } else {
            
            this.realprint = '';
    
        }
        
        
    },
    
    draw: function (){
        
        this.writetext();
        
        this.parent();
        
    },
    
    
    
    update: function(){
        
    
          
     this.parent();
     
     
    },
    
    
    
    
    });
    

});
