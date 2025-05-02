import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { graphql } from '@octokit/graphql';
import QRCode from 'qrcode';

const PROJECTS = [
  {
    name: 'Daily Checklist',
    url: 'https://rootlake.github.io/daily/',
    updatedAt: '', // Add update date if available
    icon: 'icons/daily.png'
  },
  {
    name: 'Codes Against Academy',
    url: 'https://rootlake.github.io/codesagainstacademy',
    updatedAt: '2024-02-20',
    icon: 'icons/codes.png'
  },
  {
    name: 'Piepacker',
    url: 'https://rootlake.github.io/piepacker',
    updatedAt: '2024-02-15',
    icon: 'icons/pie.png'
  },
  {
    name: 'One-dle',
    url: 'https://rootlake.github.io/one-dle',
    updatedAt: '2024-02-10',
    icon: 'icons/one.png'
  },
  {
    name: 'Facenames',
    url: 'https://rootlake.github.io/facenames',
    updatedAt: '2024-02-05',
    icon: 'icons/face.png'
  },
  {
    name: 'Petals',
    url: 'https://rootlake.github.io/petals',
    updatedAt: '2024-02-01',
    icon: 'icons/petal.png'
  },
  {
    name: 'Morse Flash',
    url: 'https://rootlake.github.io/morseflash',
    updatedAt: '2024-01-20',
    icon: 'icons/morse.png'
  }
];

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  
  const projectInfo = document.createElement('div');
  projectInfo.className = 'project-info';
  
  const iconContainer = document.createElement('div');
  iconContainer.className = 'icon-container';
  
  const icon = document.createElement('img');
  icon.className = 'project-icon';
  icon.src = project.icon;
  icon.alt = `${project.name} icon`;
  icon.width = 32;
  icon.height = 32;
  iconContainer.appendChild(icon);
  
  const title = document.createElement('h2');
  title.textContent = project.name;
  
  projectInfo.append(iconContainer, title);
  
  const qrContainer = document.createElement('div');
  qrContainer.className = 'qr-container';
  const qrCode = document.createElement('canvas');
  qrCode.className = 'qr-code';
  QRCode.toCanvas(qrCode, project.url, { width: 60 });
  qrContainer.appendChild(qrCode);
  
  // Create modal for expanded QR code
  const modal = document.createElement('div');
  modal.className = 'qr-modal';
  modal.style.display = 'none';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'qr-modal-content';
  
  const modalHeader = document.createElement('div');
  modalHeader.className = 'qr-modal-header';
  
  const modalTitle = document.createElement('h3');
  modalTitle.textContent = project.name;
  
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  closeButton.className = 'qr-modal-close';
  
  modalHeader.append(modalTitle, closeButton);
  
  const modalQR = document.createElement('canvas');
  modalQR.className = 'qr-modal-code';
  
  modalContent.append(modalHeader, modalQR);
  modal.appendChild(modalContent);
  
  // Toggle QR code modal
  qrContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.style.display = 'flex';
    QRCode.toCanvas(modalQR, project.url, { width: 300 });
  });
  
  // Close modal on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Close modal on X click
  closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.style.display = 'none';
  });
  
  // Make card clickable
  card.addEventListener('click', () => {
    window.open(project.url, '_blank');
  });
  
  card.append(projectInfo, qrContainer, modal);
  return card;
}

function filterProjects(searchTerm) {
  const filteredProjects = PROJECTS.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const projectsContainer = document.getElementById('projects');
  projectsContainer.innerHTML = '';
  filteredProjects.forEach(project => {
    const card = createProjectCard(project);
    projectsContainer.appendChild(card);
  });
}

// Add development server QR code to header
function addDevServerQR() {
  const header = document.querySelector('header');
  const qrContainer = document.createElement('div');
  qrContainer.className = 'dev-qr';
  
  const qrTitle = document.createElement('p');
  qrTitle.textContent = 'View on Mobile:';
  
  const qrCode = document.createElement('canvas');
  QRCode.toCanvas(qrCode, window.location.href, { width: 100 });
  
  qrContainer.append(qrTitle, qrCode);
  header.appendChild(qrContainer);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const themeToggle = document.getElementById('themeToggle');
  
  // Set dark mode as default
  document.body.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  
  // Add dev server QR code
  if (window.location.hostname === 'localhost' || window.location.hostname.includes('192.168')) {
    addDevServerQR();
  }
  
  // Initialize projects display
  filterProjects('');
  
  const debouncedFilter = debounce((value) => filterProjects(value), 300);
  searchInput.addEventListener('input', (e) => debouncedFilter(e.target.value));
  
  // Event listeners
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  const modal = document.querySelector('.qr-modal');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'qr-modal-title');

  // Add keyboard navigation for modal
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
