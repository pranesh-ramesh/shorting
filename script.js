let names = [];
let isSorting = false;

const nameContainer = document.getElementById('nameContainer');
const sortButton = document.getElementById('sortButton');

function createNameBlocks() {
  nameContainer.innerHTML = '';

  names.forEach(name => {
    const nameBlock = document.createElement('div');
    nameBlock.className = 'name-block';
    nameBlock.textContent = name;
    nameContainer.appendChild(nameBlock);
  });
}

function addName() {
  if (isSorting) return;

  const nameInput = document.getElementById('nameInput').value.trim();
  if (nameInput) {
    names.push(nameInput);
    document.getElementById('nameInput').value = '';

    createNameBlocks();
  }
}

async function selectionSort() {
  const nameBlocks = document.querySelectorAll('.name-block');

  for (let i = 0; i < names.length - 1; i++) {
    let minIndex = i;
    nameBlocks[i].classList.add('active');

    for (let j = i + 1; j < names.length; j++) {
      nameBlocks[j].classList.add('active');

      if (names[j] < names[minIndex]) {
        nameBlocks[minIndex].classList.remove('min');
        minIndex = j;
        nameBlocks[minIndex].classList.add('min');
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      nameBlocks[j].classList.remove('active');
    }

    if (minIndex !== i) {
      [names[i], names[minIndex]] = [names[minIndex], names[i]];
      createNameBlocks();
    }

    nameBlocks[i].classList.remove('active');
    nameBlocks[minIndex].classList.remove('min');
  }
}

async function startSorting() {
  if (names.length === 0) return;

  isSorting = true;
  sortButton.disabled = true;

  await selectionSort();

  sortButton.disabled = false;
  isSorting = false;
}

createNameBlocks();
