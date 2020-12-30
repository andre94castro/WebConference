window.onload = function () {
    const btnRegister = document.getElementById("btnRegister");
    btnRegister.addEventListener("click", function () {
        //abertura da janela modal
        swal({
            title: "Inscrição na WebConference",
            html:
                '<input id="txtName" class="swal2-input" placeholder="Name">' +
                '<input id="txtEmail" class="swal2-input" placeholder="E-mail">',
            showCancelButton: true,
            confirmButtonText: "Inscrever",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const name = document.getElementById("txtName").value;
                const email = document.getElementById("txtEmail").value;
                const url_base = "https://fcawebbok.herokuapp.com";
                return fetch(`${url_base}/conference/1/participants/${email}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlenconded",
                    },
                    method: "POST",
                    body: `nomeparticipant=${name}`,
                })
                    .then((response) => {
                        if (response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch((error) => {
                        swal.showValidationError(`Pedido falhou: ${error}`);
                    });
            },
            allowOutsideClick: () => !swal.isLoading(),
        }).then((result) => {
            if (result.value) {
                if (result.value.err_code) {
                    swal({ title: "Inscrição feita com sucesso!" });
                } else {
                    swal({ title: `${result.value.err_message}` });
                }
            }
        });
    });

    //load dos oradores
    (async () => {
        const renderSpeakers = document.getElementById("renderSpeakers");
        let txtSpeakers = "";
        const response = await fetch(`${urlBase}/conferences/1/speakers`);
        const speakers = await response.json();

        for (const speaker of speakers) {
            txtSpeakers += `
            <div class="col-sm-4 center-block">
                <div class="team-member">
                    <img id="${speaker.idSpeaker}" src="${speaker.foto}" alt="" class="mx-auto rounded-circle viewSpeaker">
                    <h4>${speaker.nome}</h4>
                    <p class="text-muted">${speaker.cargo}</p>
                    <ul class="list-inline social-buttons">`;
            if (speaker.twitter !== null) {
                txtSpeakers += `
                        <li class="list-inline-item">
                            <a href='${speaker.twitter}'><i class="fab fa-twitter"></i></a>
                        </li>`;
            }
            if (speaker.facebook !== null) {
                txtSpeakers += `
                        <li class="list-inline-item">
                            <a href='${speaker.facebook}'><i class="fab fa-facebook"></i></a>
                        </li>`;
            }
            if (speaker.linkedin !== null) {
                txtSpeakers += ` 
                        <li class="list-inline-item">
                            <a href='${speaker.linkedin}'><i class="fab fa-linkedin-in"></i></a>
                        </li>`;
            }
            txtSpeakers += `
                    </ul>
                </div>
            </div>
            `;

            const btnView = document.getElementsByClassName("viewSpeaker");
            for (let i = 0; i < btnView.length; i++) {
                btnView[i].addEventListener("click", () => {
                    for (const speaker of speakers) {
                        if (
                            speaker.idSpeaker == btnView[i].getAttribute("id")
                        ) {
                            //janela modal
                            console.log("abri janela modal");
                        }
                    }
                });
            }
        }
        renderSpeakers.innerHTML = txtSpeakers;
    })();

    //load dos sponsors
    (async () => {
        const renderSponsors = document.getElementById("renderSponsors");
        let txtSponsors = "";
        const response = await fetch(`${urlBase}/conference/1/sponsors`);
        const sponsors = await response.json();

        for (const sponsor of sponsors) {
            txtSponsors += `
            <div class="col-md-3 col-sm-6">
                <a href="${sponsor.link}" target="_blank">
                    <img class="img-fluid d-block mx-auto"
                        src="${sponsor.logo}"
                        alt="${sponsor.nome}">
                </a>
            </div>
            `;
        }
        renderSponsors.innerHTML = txtSponsors;
    })();

    //botão de enviar mensagem
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", async () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const response = await fetch(`${urlBase}/contacts/emails`, {
            headers: {
                "content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            body: `email=${email}&name=${name}&subject=${message}`,
        });
        const result = await response.json();
        if (result.value.sucess) {
            swal("Envio de mensagem", result.value.message.pt, "success");
        } else {
            //Exibir modal com erro
            console.log("Exibir modal com erro");
        }
    });
};
