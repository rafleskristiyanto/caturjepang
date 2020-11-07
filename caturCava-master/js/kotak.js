function pindahKotak(posisi_asal, posisi_baru){
	kotaks[posisi_asal].classList.remove('player');
	kotaks[posisi_asal].classList.remove('terpilih');

	player[posisi_asal] = false;
	player[posisi_baru] = true;

	kotaks[posisi_baru].classList.add('player');
	for(let i=0; i<sugestedBox.length; i++){
		kotaks[sugestedBox[i]].classList.remove('directTo');
	}

	if(!sudahMenang("player")){
		giliranMusuh();
	}
}

function tandaiTerpilih(i){
	var a = document.getElementsByClassName('terpilih');
	if(a.length>0) a[0].classList.remove('terpilih');
	kotaks[i].classList.add('terpilih');

}

for(let i=0; i<kotaks.length; i++){
	kotaks[i].addEventListener("click", function(){
		
		var pos = i;
		
		if(this.classList.contains('player')){
			tampilkanSugesti(i);
			itemTerpilih = i;
			tandaiTerpilih(i);
		} 

		else if(this.classList.contains('directTo')){
			pindahKotak(itemTerpilih, i);
		}


	});
}