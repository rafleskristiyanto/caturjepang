function tampilkanSugesti(posisi_asal){
	var tmp = [];
	for(let i=0; i<9; i++){
		if(!kotaks[i].classList.contains('player') && !kotaks[i].classList.contains('enemy')){
			kotaks[i].classList.remove('directTo');
			if(path[posisi_asal][i]==1){
				kotaks[i].classList.add('directTo');
				tmp.push(i);
			}
		}
	}
	sugestedBox = tmp;
}

function posisiPemain(pihak){
	var r = [];
	var el = document.getElementsByClassName(pihak);
	for(let i=0; i<el.length; i++){
		r.push( Number(el[i].id.split("-")[1]) );
	}
	return r;
}

function sudahMenang(pihak){
	var pp = posisiPemain(pihak);
	pp.sort(function(a, b){return a - b});
	for(let i=0; i<successPath.length; i++){
		if(successPath[i].pihak == pihak || successPath[i].pihak == "semua"){
			if(successPath[i].posisi[0]==pp[0] && successPath[i].posisi[1]==pp[1] && successPath[i].posisi[2]==pp[2])
				{
					if(pihak=="player")
						alert("Kamu telah mengalahkan AI, terimakasih telah mencoba");
					else
						alert("Kamu lebih noob dari AI :v");
					location.reload(); 
				}
		}
	}
	return false;
}
