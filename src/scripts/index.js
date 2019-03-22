import '../styles/style.scss';
import getUserInfos from './services';

const name = document.querySelector('.name');
const avatar = document.querySelector('.avatar');
const repos = document.querySelector('.repos');

const searchBtn = document.querySelector('.search__btn');
const errorNotFound = document.querySelector('.error__notfound');

function searchUser() {
  const searchInpuValue = document.querySelector('.search-input').value;

  if (searchInpuValue === '') {
    alert('Please, enter the user name');
  } else {
    getUserInfos(searchInpuValue)
      .then((response) => {
        if (response.status === 403) {
          errorNotFound.classList.add('active');
        } else {
          return response.json();
        }
      })

      .then((data) => {
        name.innerHTML = data.name;
        avatar.src = data.avatar_url;
        avatar.classList.add('active');
      })
      .catch((error) => {
        console.log(error);
      });

    getUserInfos(`${searchInpuValue}/repos`)
      .then((response) => {
        if (response.status === 403) {
          errorNotFound.classList.add('active');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        repos.innerHTML = data.map(
          (repo) =>
            `<li class="repos-item"><a href="${repo.html_url}">${
              repo.name
            }</a></li>`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

searchBtn.addEventListener('click', () => searchUser());
