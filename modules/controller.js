
class Controller {
  constructor(u, d, l, r) {
    var self = this;
    self.state = { move: {
                    up: false,
                    down: false,
                    left: false,
                    right: false,
                    space: false
                  }
                 };
    self.map = { };
    self.map[u] = 'up';
    self.map[d] = 'down';
    self.map[l] = 'left';
    self.map[r] = 'right';
    self.map[32] = 'space';

    // Lorsqu'une touche est pressée.
    this.down = function (event) {
      var key = self.map[event.keyCode];
      self.state.move[key] = true;
      }
    // Lorsqu'une touche est relaché.
    this.up = function (event) {
      var key = self.map[event.keyCode];
      self.state.move[key] = false;
    }
  }

}
