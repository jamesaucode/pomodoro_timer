const formatTime = seconds => {
  let minutes = Math.floor(seconds / 60);
  let seconds_modulo = (seconds % 60).toString();
  let seconds_padded = seconds_modulo < 10 ? seconds_modulo.padStart(2, "0") : seconds_modulo.padEnd(2, "0");
  return minutes + ":" + seconds_padded;
};

export { formatTime }