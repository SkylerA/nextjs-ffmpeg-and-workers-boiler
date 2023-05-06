self.addEventListener("message", (event) =>
  console.log("Worker received:", event.data)
);
self.postMessage("🐶Msg from Worker");
