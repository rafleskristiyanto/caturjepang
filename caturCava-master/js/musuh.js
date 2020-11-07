function musuhPindah(posisi_asal, posisi_baru){
	kotaks[posisi_asal].classList.remove('enemy');
	kotaks[posisi_baru].classList.add('enemy');
	sudahMenang("enemy"); // dia nanya, apakah sudah menang ?
}

function recanaTerbaik(posisi){
	var tmp;
	var rencananya = [];
	for(let i=0; i<successPath.length; i++){
		if(successPath[i].pihak == "semua" || successPath[i].pihak == "enemy"){
			tmp = path[posisi[0]][successPath[i].posisi[0]];
			tmp += path[posisi[1]][successPath[i].posisi[1]];
			tmp += path[posisi[2]][successPath[i].posisi[2]];
			rencananya.push({ pola : i, bobot : tmp });			
		}
	}
	return rencananya;
}

function in_array(dicari, arraynya){
	for(let i=0; i<arraynya.length; i++){
		if(arraynya[i] == dicari)
			return true;
	}
	return false;
}

function shuffelIndex(){
	var arr = [];
	arr.push(Math.floor(Math.random()*2));
	arr.push(Math.floor(Math.random()*2));
	arr.push(Math.floor(Math.random()*2));
	return arr;
}

function shufferArray(arrr, pattern){
	var arr = [];
	arr[0] = arrr[0];
	arr[1] = arrr[1];
	arr[2] = arrr[2];
	var tmp;
	for(let i=0; i<3; i++){
		tmp = arr[i];
		arr[i] = arr[ pattern[i] ];
		arr[ pattern[i] ] = tmp;
	}
	return arr;
}

function langkahMusuh(rencana, posisi){
	var rr, rx;
	var shuf = shuffelIndex();
	posisi = shufferArray(posisi, shuf);
	for(let i=0; i<rencana.length; i++){
		
		if(rencana[i] == undefined)
		alert(i+" in : "+JSON.stringify(rencana));

		rx = successPath[rencana[i].pola].posisi;
		rr = shufferArray(rx, shuf);
		for(let j=0; j<posisi.length; j++){

			for(let k=0; k<rr.length; k++){
				if(path[ posisi[j] ][ rr[k] ] == 1 && !in_array(posisi[j], rr) && !in_array(posisi[j], dicurigai)){
					if(!kotaks[rr[k]].classList.contains('player') && !kotaks[rr[k]].classList.contains('enemy')){
						return [posisi[j], rr[k]];	
					}			
				}
			}
			
		}		

	}

}

function manaSok(x, y){
	for(let i =0; i<player.length; i++){
		if(player[i] && i!=x && i!=y)
			return i;
	}
}

function critical_path(posisi_musuh){
	var ss = [];
	var en; 
	dicurigai = [];
	for(let i=0; i<successPath.length; i++){
		if(successPath[i].pihak == "player" || successPath[i].pihak=="semua"){
			ss = successPath[i].posisi;
			if(player[ss[0]] && player[ss[1]]){
				en = manaSok(ss[0], ss[1]);
				if(path[ss[2]] [en] == 1){
					dicurigai.push(ss[2]);
					if(!in_array(ss[2], posisi_musuh))
						return ss[2];
				}
			}
			if(player[ss[0]] && player[ss[2]]){
				en = manaSok(ss[0], ss[2]);
				if(path[ss[1]] [en] == 1 ){
					dicurigai.push(ss[1]);
					if(!in_array(ss[1], posisi_musuh))
						return ss[1];
				}
			}
			if(player[ss[1]] && player[ss[2]]){
				en = manaSok(ss[1], ss[2]);
				if(path[ss[0]] [en] == 1){
					dicurigai.push(ss[0]);
					if(!in_array(ss[0], posisi_musuh))
						return ss[0];
			}	}		
		}
	}

	return null;
}

function giliranMusuh(){
	var pp = posisiPemain('enemy');
	pp.sort(function(a, b){return a - b});

	var critical = critical_path(pp);

	if(critical!=null && !in_array(critical, pp)){
		alert('bertahan');
		for(let i=0; i<pp.length; i++){
			if(path[pp[i]][critical] == 1){
				musuhPindah(pp[i], critical);
				return;
			}
		}

	} 

	var rencana  = recanaTerbaik(pp);
	rencana.sort(compareValues('bobot'));

	var langkah = langkahMusuh(rencana, pp);
	if(langkah != undefined)
		musuhPindah(langkah[0], langkah[1]);	
	else{
		alert("Musuh Mati Langkah, kamu dianggap menang");
		location.reload();
	}	

}