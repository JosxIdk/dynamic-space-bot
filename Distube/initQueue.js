module.exports = {
  name: "initQueue",
  once: true,
  async execute(queue) {
    queue.autoplay = false;
    queue.volume = 100;
  },
};
