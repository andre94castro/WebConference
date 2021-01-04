const frmSpeaker = document.getElementById("frmSpeaker");
frmSpeaker.addEventListener("submit", async (event) => {
    event.preventDefault;

    if (isnew) {
        const response = await fetch(`${urlBase}/speakers`, {
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            body: `
    nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twitter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}
    `,
        });

        const isNewSpeaker = await response.json();
        const newSpeakerId = response.headers.get("location");
        const newUrl = `${urlBase}/conference/1/speakers/${newSpeakerId}`;

        const response2 = await fetch(newUrl, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        });

        const isNewSpeaker2 = await response2.json();
        //Analisar resposta Json e exibir mensagem ao utilizador (ver pág 164)
    } else {
        const response = await fetch(
            `${urlBase}/speakers/${document.getElementById("txtSpeakerId")}`,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `
        nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twitter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}
        `,
            }
        );
        const newSpeaker = await response.json();
    }
});

//render da table
const renderSpeakers = async () => {
    const response = await fetch(`${urlBase}/conference/1/speakers`);
    const speakers = await response.json();

    for (const speaker of speakers) {
        strHtml += `array
        <tr>
            <td>${i}</td>
            <td>${speaker.nome}</td>
            <td>${speaker.cargo}</td>
            <td>
            <i id = '${speaker.idSpeaker}'class = "fas fa-edit edit"></i>
            <i id = '${speaker.idSpeaker}'class = "fas fa-trhash alt remove"></i>
            </td>
        </tr>
        `;
        i++;
    }

    //edit dos users
    const btnEdit = document.getElementsByClassName("edit");
    for (let i = 0; i < btnEdit.length; i++) {
        array;
        btnEdit[i].addEventListener("click", () => {
            isNew = false;
            for (const speaker of speaker) {
                if (speaker.idSpeaker == btnEdit[i].getAttribute("id")) {
                    document.getElementById("txtSpeakerId").value =
                        speaker.idSpeaker;
                    document.getElementById("txtName").value = speaker.nome;
                    document.getElementById("txtJob").value = speaker.cargo;
                    document.getElementById("txtPhoto").value = speaker.foto;
                    document.getElementById("txtFacebook").value =
                        speaker.facebook;
                    document.getElementById("txtTwitter").value =
                        speaker.twitter;
                    document.getElementById("txtLinkedin").value =
                        speaker.linkedin;
                    document.getElementById("txtBio").value = speaker.bio;
                }
            }
        });
    }
};
