export class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;
  }

  update(temperature) {
    // 1. Сила "тряски" зависит от температуры
    const shake = temperature * 1;

    // 2. Добавляем случайное ускорение
    this.vx += (Math.random() - 0.5) * shake;
    this.vy += (Math.random() - 0.5) * shake;

    // 3. Небольшое затухание (чтобы не разгонялись бесконечно)
    this.vx *= 0.98;
    this.vy *= 0.98;

    // 4. Перемещаем частицу
    this.x += this.vx;
    this.y += this.vy;
  }
}
