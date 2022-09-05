let param_speed = 3.0;
let param_ampli = 0.05;
let param_freq = 1.5;

function rangeChange(id, value) {
    if (id == 0) {
        param_speed = value;
    } else if (id == 1) {
        param_ampli = value;
    } else if (id == 2) {
        param_freq = value;
    }
}
