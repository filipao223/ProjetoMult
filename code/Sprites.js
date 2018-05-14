class Sprites{
  constructor(x, y, w, h, speed, img, blue)
	{
		//posição e movimento
		this.xIni = x;
		this.yIni = y;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		//VELOCIDADES
		this.speed = speed;
		this.speedIni = speed;
    this.blue = blue;

		//imagem
		this.img = img;
		//this.imgData = this.getImageData(img);

		}
}
