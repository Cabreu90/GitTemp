/*  Cesarin Abreu:
    Javascript to create the board (world). Including functions to get a new board set up 
    and coded life rules.
*/


	var Board;
	var xsize = 10;
	var ysize = 10;

	//Create New Board
	var newBoard;

	var dead = 0;
	var alive = 1;

	function Neighbors(Board, x, y)
	{
		var n = 0;
		if(x!==0 && y!==0 && x!=xsize-1 && y!=ysize-1){
			if(Board[x-1][y-1]==alive){ ++n;}
			if(Board[x-1][y]==alive){ ++n;}		
			if(Board[x-1][y+1]==alive){ ++n;}
			
			if(Board[x][y-1]==alive){ ++n;}
			if(Board[x][y+1]==alive){ ++n;}
			
			if(Board[x+1][y-1]==alive){ ++n;}
			if(Board[x+1][y]==alive){ ++n;}
			if(Board[x+1][y+1]==alive){ ++n;}
			
		}else{ 
			if(y === 0){
			
				if(Board[x][ysize-1]==alive){ ++n;}
				if(Board[x][1]==alive){ ++n;}
				
				if(x != xsize-1){
					if(Board[x+1][y]==alive){ ++n;}
					if(Board[x+1][ysize-1]==alive){ ++n;}
					if(Board[x+1][1]==alive){ ++n;}
				
				}else{
					if(Board[0][ysize-1]==alive){ ++n;}
					if(Board[0][0]==alive){ ++n;}
					if(Board[0][1]==alive){ ++n;}			
				}
				
				if(x===0){
					if(Board[xsize-1][ysize-1]==alive){++n;}
					if(Board[xsize-1][0]==alive){ ++n;}
					if(Board[xsize-1][1]==alive){ ++n;}
				}else{
					if(Board[x-1][ysize-1]==alive){ ++n;}
					if(Board[x-1][y]==alive){ ++n;}
					if(Board[x-1][y+1]==alive){ ++n;}
				}
			}else if(y==ysize-1){// 1 9
				if(Board[x][y-1]==alive){ ++n;}
				if(Board[x][0]==alive){ ++n;}
				
				if(x!=xsize-1){
					
					if(Board[x+1][y-1]==alive){ ++n;}
					if(Board[x+1][y]==alive){ ++n;}
					if(Board[x+1][0]==alive){ ++n;}
				
				}else{//9 9
					if(Board[0][y-1]==alive){ ++n;}
					if(Board[0][x]==alive){ ++n;}
					if(Board[0][0]==alive){ ++n;}
				}
			
				if(x===0){
					if(Board[xsize-1][y-1]==alive){ ++n;}
					if(Board[xsize-1][y]==alive){ ++n;}
					if(Board[xsize-1][0]==alive){ ++n;}
				}else{
					if(Board[x-1][y-1]==alive){ ++n;}
					if(Board[x-1][y]==alive){ ++n;}
					if(Board[x][0]==alive){ ++n;}
				}
			
			}
			else if(x==xsize-1){
				if(Board[x][y-1]==alive){ ++n;}
				if(Board[x][y+1]==alive){ ++n;}
		
		
				if(Board[x-1][y-1]==alive){ ++n;}
				if(Board[x-1][y]==alive){ ++n;}
				if(Board[x-1][y+1]==alive){ ++n;}
			
				if(Board[0][y]==alive){ ++n;}
				if(Board[0][y-1]==alive){ ++n;}
				if(Board[0][y+1]==alive){ ++n;}
			
			}else if(x===0){
				if(Board[xsize-1][y-1]==alive){ ++n;}
				if(Board[xsize-1][y]==alive){ ++n;}
				if(Board[xsize-1][y+1]==alive){ ++n;}
			
				if(Board[x][y-1]==alive){ ++n;}
				if(Board[x][y+1]==alive){ ++n;}
			
				if(Board[x+1][y-1]==alive){ ++n;}
				if(Board[x+1][y]==alive){ ++n;}
				if(Board[x+1][y+1]==alive){ ++n;}
			}
		}
		return n;
	}

    // kill if there is a bacteria alive in the given position of the board.
	function Kill(Board,x,y)
	{
		if(Board[x][y] === alive)
			Board[x][y] = dead;
	}

    // Bring a bacteria to life if there are not bacteria alive in this position.
	function MakeLive(Board,x,y)
	{
		if(Board[x][y] === dead)
			Board[x][y] = alive;
	}

    // Next bacteria life cicle.
	function NextStep(Board)
	{

        // Check all board positions
		for(var x = 0; x < xsize; ++x)
		{
			for(var y = 0; y < ysize; ++y)
			{
                var n=0;

                // Check how many living neighbors this board position has.
                n = Neighbors(Board,x,y); 
                // Bring a bacteria to life If there are 3 living neightbors in this position.
                if(n==3){ MakeLive(newBoard,x,y);}
                // Kill any living bacteria in this position if it has less or more than 3 living neoghtbors.
				else if((n<2)||(n>3)){ Kill(newBoard,x,y);}
			}
		}
		
	}

	function DrawBoard(Board)
	{
		var Text = "";
		for(var y = 0; y < ysize; ++y)
		{
			for(var x = 0; x < xsize; ++x)
				Text += Board[x][y]==alive ? "o":"_";
			Text += "<br/>";
		}
		document.getElementById("board").innerHTML = Text;
	}


    // Array cloning method from: 
    // http://stackoverflow.com/questions/2294703/multidimensional-array-cloning-using-javascript
	Array.prototype.clone = function() {
		var arr = this.slice(0);
		for( var i = 0; i < this.length; i++ ) {
			if( this[i].clone ) {
				arr[i] = this[i].clone();
			}
		}
		return arr;
	};


	function Main(b)
	{
        // User chooses board setup: blinker, glider, or flower. 
        // Flower is the default board set up.
		var BoardSetup = b;
        
        // Create new board
		Board = new Array(xsize);
		for(var x = 0; x < xsize; ++x)
		{
			Board[x] = new Array(ysize);
			for(var y = 0; y < ysize; ++y)
				Board[x][y] = 0;
		}
        
        // Add the selected set up in the board.
		if(BoardSetup == "blinker")
		{
			Board[1][0] = 1;
			Board[1][1] = 1;
			Board[1][2] = 1;
		}
		else if(BoardSetup == "glider")
		{
			Board[2][0] = 1;
			Board[2][1] = 1;
			Board[2][2] = 1;
			Board[1][2] = 1;
			Board[0][1] = 1;
		}
		else if(BoardSetup == "flower")
		{
			Board[4][6] = 1;
			Board[5][6] = 1;
			Board[6][6] = 1;
			Board[7][6] = 1;
			Board[8][6] = 1;
			Board[9][6] = 1;
			Board[0][6] = 1;
			Board[4][7] = 1;
			Board[6][7] = 1;
			Board[8][7] = 1;
			Board[0][7] = 1;
			Board[4][8] = 1;
			Board[5][8] = 1;
			Board[6][8] = 1;
			Board[7][8] = 1;
			Board[8][8] = 1;
			Board[9][8] = 1;
			Board[0][8] = 1;
		}
		// Display the current board.
		DrawBoard(Board);
	}