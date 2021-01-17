const router = require("express").Router();
const controllerSpeaker = require("../controllers/speaker.controller.js");
const controllerSponsor = require("../controllers/sponsor.controller.js");
const controllerConference = require("../controllers/conference.controller.js");
const controllerParticipant = require("../controllers/participant.controller.js");
const controllerMail = require("../controllers/mail.controller.js");

router.get("/", function (req, res) {
    res.send("FCA Book");
    res.end();
});

router.get("/speakers/", controllerSpeaker.read);
router.get("/speaker/:id", controllersSpeaker.readID);
router.post("/speakers/", isLoggedIn, controllerSpeaker.save);
router.put("/speakers/:id", isLoggedIn, isLoggedIn, controllerSpeaker.update); //?
router.put("/speakers/del/:id", isLoggedIn, controllerSpeaker.deleteL);
router.delete("/speakers/:id", isLoggedIn, controllersSpeaker.deleteF);

router.get("/sponsors", controllerSponsor.read);
router.get("/sponsors/:id", controllerSponsor.readID);
router.post("/sponsors/", isLoggedIn, controllerSponsor.save);
router.put("/sponsors/:id", isLoggedIn, controllerSponsor.update);
router.put("/sponsor/del/:id", isLoggedIn, controllerSponsor.deleteL);
router.delete("/sponsors/:id", isLoggedIn, controllerSponsor.deleteF);

router.get("/conferences", controllerConference.readConference);
router.get("/conferences/:id", controllerConference.readConferenceId);

router.get(
    "conferences/:idconf/participants",
    controllerConference.readParticipant
);
router.post(
    "/conferences/:idconf/participants/:idparticipant",
    controllerConference.saveParticipant
);
router.delete(
    "/conferences/:idconf/participants/:idparticipant",
    isLoggedIn,
    controllerConference.deleteParticipant
);

router.get("/conferences/:idconf/sponsors/", controllerConference.readSponsor);
router.post(
    "/conferences/:idconf/sponsors/:idsponsor",
    isLoggedIn,
    controllerConference.saveSponsor
);
router.delete(
    "/conferences/:idconf/sponsors/:idsponsor",
    isLoggedIn,
    controllerConference.deleteSponsor
);

router.get("/conferences/:idconf/speakers/", controllerConference.readSpeaker);
router.post(
    "/conferences/:idconf/sponsors/:idspeaker",
    isLoggedIn,
    controllerConference.saveSpeaker
);
router.delete(
    "/conferences/:idconf/sponsors/:idspeaker",
    isLoggedIn,
    controllerConference.deleteSpeaker
);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(jsonMessages.login.unauthorized.status).send(
            jsonMessages.login.unauthorized
        );
        return next();
    }
}

router.post("/contacts/emails", controllerMail.send);
module.exports = router;
