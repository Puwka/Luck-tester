var local = new Vue({
  el: ".app",
  data: {
    spc: true,
    currentButton: "start",
    n: 1,
    showModal: false,
    message: '',
    count: 0,
		record: 0,
    items: []
  },
  components: {
    modal: {
      template: "#modal-template",
      methods: {
        clear: function() {
          local.items = [];
					local.count = 0;
					local.n = 1;
        }
      }
    },
    start: {
      template: "#start-button-template",
      methods: {
        switchButton: function(view) {
          local.currentButton = view
        },
        go: function go() {
          var pointer = document.getElementById('pointer')
          i = 3;
          var timerForward = setInterval(function() {
            if (local.spc == true) {
              clearInterval(timerForward)
            }
            i += local.n;
            pointer.style.top = i + "px"
            if (i >= 183) {
              clearInterval(timerForward)
              var timerBack = setInterval(function() {
                if (local.spc == true) {
                  clearInterval(timerBack)
                }
                i -= local.n;
                pointer.style.top = i + "px"
                if (i <= 3) {
                  clearInterval(timerBack)
                  go();
                }
              }, 10)
            }
          }, 10)
        },
        spc: function() {
          local.spc = false
        }
      }
    },
    stop: {
      template: "#stop-button-template",
      methods: {
        switchButton: function(view) {
          local.currentButton = view
        },
        spc: function() {
          local.spc = true
        },
        check: function() {
          var pointer = document.getElementById('pointer')
          if (parseInt(pointer.style.top) > 20 && parseInt(pointer.style.top) < 53) {
            local.count++
            local.items.push({
              isHit: true,
              isMiss: false
            })
            local.n++
          } else {
            if (local.items.length < 17) {
              local.items.push({
                isHit: false,
                isMiss: true
              })
            }
          }
					if(local.items.length == 17) {
          if (local.count == 0) {
            local.message = "Бывает, " + local.count + " Очков"
          }
          if (local.count == 1) {
            local.message = "Да, это жестко! " + local.count + " Очко"
          }
          if (local.count >= 2 && local.count <= 5) {
            local.message = "Неплохо, " + local.count + " Очка"
          }
          if (local.count >= 5) {
            local.message = "Круто, целых " + local.count + " Очков"
          }
          local.showModal = true;
					if(local.count > local.record) {
						local.record = local.count;
						console.log(local.record)
					}
        }
      }
    }
  }
}
});
