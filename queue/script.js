let queue = [];
const MAX_QUEUE_SIZE = 8;

document.getElementById("enqueueBtn").addEventListener("click", () => {
  const customerName = document.getElementById("customerName").value;

  if (queue.length < MAX_QUEUE_SIZE) {
    if (customerName) {
      queue.push(customerName);
      document.getElementById("customerName").value = ""; // Clear the input
      updateQueueDisplay();
    }
  } else {
    alert("Queue is full. Cannot add more customers.");
  }
});

document.getElementById("dequeueBtn").addEventListener("click", () => {
  if (queue.length > 0) {
    alert("Next customer: " + queue[0]);
    queue.shift();
    updateQueueDisplay();
  } else {
    alert("No more customers in the queue.");
  }
});

function updateQueueDisplay() {
  const queueList = document.getElementById("queueList");
  queueList.innerHTML = `<h3>Queue (${queue.length}/${MAX_QUEUE_SIZE})</h3>`;

  if (queue.length === MAX_QUEUE_SIZE) {
    alert("Queue is full. Cannot add more customers.");
  }

  queue.forEach((customer, index) => {
    queueList.innerHTML += `<p>${index + 1}. ${customer}</p>`;
  });
}

function callCustomer(index) {
  alert("Calling customer: " + queue[index]);
  queue.splice(index, 1);
  updateQueueDisplay();
}

// Add this event listener to handle the "Clear Queue" button click
document.getElementById("clearQueueBtn").addEventListener("click", () => {
  clearQueue();
});

// Add this function to clear the queueList
function clearQueue() {
  queue = [];
  updateQueueDisplay();
}

// Notify Line Messaging API
function sendLineNotification(message) {
  const lineAccessToken = "kbXsnEAqw3a2Naj5S0H52TOfoQrhNao7LS3GIopKRIW"; // ใส่ Access Token ที่ได้จาก Line Developer Console
  const lineEndpoint = "https://api.line.me/v2/bot/message/multicast";

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${lineAccessToken}`,
  });

  const body = JSON.stringify({
    to: ["0917987860th"], // Own ID user line 
    messages: [
      {
        type: "text",
        text: message,
      },
    ],
  });

  fetch(lineEndpoint, {
    method: "POST",
    headers: headers,
    body: body,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

