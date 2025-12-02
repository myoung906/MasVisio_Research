document.addEventListener('DOMContentLoaded', () => {
    const researchProjectsContainer = document.getElementById('research-projects');
    const publicationsContainer = document.getElementById('publications');

    fetch('assets/data/content.json')
        .then(response => response.json())
        .then(data => {
            const projects = data.ko.projects;
            const publications = data.ko.publications;

            if (researchProjectsContainer) {
                projects.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('card');
                    projectCard.innerHTML = `
                        <h3>${project.title}</h3>
                        <p>${project.subtitle}</p>
                    `;
                    researchProjectsContainer.appendChild(projectCard);
                });
            }

            if (publicationsContainer) {
                publications.forEach(publication => {
                    const publicationCard = document.createElement('div');
                    publicationCard.classList.add('card');
                    publicationCard.innerHTML = `
                        <h3>${publication.title}</h3>
                        <p><strong>Authors:</strong> ${publication.authors}</p>
                        <p><em>${publication.journal}</em></p>
                        <a href="${publication.doi}" target="_blank">Read More</a>
                    `;
                    publicationsContainer.appendChild(publicationCard);
                });
            }
        });
});