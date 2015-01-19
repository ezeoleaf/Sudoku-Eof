/* Sudoku engine licensed for use by websudoku.com. */

function ws_j1()
{	
	if (!document.getElementById) 
		return true;

	p=new Array(9);
	a=new Array(9);
	m=new Array(9);
	
	for (x=0; x<9; x++) {
		p[x]=new Array(9);
		a[x]=new Array(9);
		m[x]=new Array(9);
	}
	
	c=0;
	h=document.getElementById('ws_cheat') ? document.getElementById('ws_cheat').value : "";

	for (x=0; x<9; x++) {
		for (y=0; y<9; y++) {
			e=document.getElementById('ws_f'+x+y);
			v=parseInt(e.value);
			
			if ((v>=1)&&(v<=9)) {
				p[x][y]=v;
				if (!e.readOnly)
					c++;
					
			} else
				p[x][y]=0;
			
			v=parseInt(h.charAt(y*9+x));
			
			if ((v>=1)&&(v<=9))
				a[x][y]=v;
			else
				a[x][y]=0;
		
			m[x][y]=0;
		}
	}
		
	for (x=0; x<9; x++) {
		s=new Array(10);
		k=false;
		
		for (y=0; y<9; y++)
			if (p[x][y]>0) {
				if (s[p[x][y]])
					k=true;
				else
					s[p[x][y]]=true;
			}
		
		if (k)
			for (y=0; y<9; y++)
				m[x][y]++;
	}
	
	for (y=0; y<9; y++) {
		s=new Array(10);
		k=false;
		
		for (x=0; x<9; x++)
			if (p[x][y]>0) {
				if (s[p[x][y]])
					k=true;
				else
					s[p[x][y]]=true;
			}
		
		if (k)
			for (x=0; x<9; x++)
				m[x][y]++;
	}
	
	for (i=0; i<3; i++)
		for (j=0; j<3; j++) {
			s=new Array(10);
			k=false;
			
			for (x=i*3; x<(i*3+3); x++)
				for (y=j*3; y<(j*3+3); y++)
					if (p[x][y]>0) {
						if (s[p[x][y]])
							k=true;
						else
							s[p[x][y]]=true;
					}
			
			if (k)
				for (x=i*3; x<(i*3+3); x++)
					for (y=j*3; y<(j*3+3); y++)
						m[x][y]++;
		}
	
	t=0;
	w=0;
	n=0;
	
	for (x=0; x<9; x++) {
		for (y=0; y<9; y++) {
			s=m[x][y];

			if (ws_do_count_wrongs)
				if ((p[x][y]>0)&&(a[x][y]>0))
					if (p[x][y]!=a[x][y]) {
						w++;
						
						if (ws_do_show_wrongs)
							s++;
					}

			if (s>3)
				s=3;
			
			t+=m[x][y];

			e=document.getElementById('ws_f'+x+y);
			e.className=e.className.substring(0, 4)+s;
			e=document.getElementById('ws_c'+x+y);
			e.className=e.className.substring(0, 4)+s;
			
			if (p[x][y]==0)
				n++;
		}
	}
	
	if (t>0)
		g=ws_message_mistakes;
	else if (w>0) {
		g=ws_message_wrongs;
		g=g.replace('*', w);
	} else if (n>0) {
		if (c>0) {
			g=ws_message_incomplete;
			g=g.replace('*', n);
		} else
			g=ws_message_default;
	} else
		return true;
		
	document.getElementById('ws_message').innerHTML=g;	
	
	return false;
}

function ws_j2()
{
	if (!document.getElementById) 
		return true;

	for (x=0; x<9; x++) {
		for (y=0; y<9; y++) {
			e=document.getElementById('ws_f'+x+y);

			if (!e.readOnly)
				e.value='';
			
			e.className=e.className.substring(0, 4)+'0';
			
			e=document.getElementById('ws_c'+x+y);
			e.className=e.className.substring(0, 4)+'0';
		}
	}
	
	document.getElementById('ws_message').innerHTML=ws_message_cleared;
	
	return false;
}