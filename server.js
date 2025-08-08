require("dotenv").config();

let config = require("./config/config");

let express = require("express");
let bodyParser = require('body-parser');
let path = require("path");
let axios = require("axios");
let app = express();

let cors = require("cors");

//handles cross origin
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mpt.natget21.xyz"
    ],
    credentials: true
  })
);
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

  
//Get MatterTags
app.get("/api/mattertags/:spaceId", function(req, res) {
  axios({
    url: "https://api.matterport.com/api/models/graph",
    method: "post",
    headers: {
      Authorization:"Basic "+config.EnVar.AUTH_HEADER,
      "Content-Type": "application/json"
    },
    data: {
      query: `{
		  	model(id: "${req.params.spaceId}") {
				mattertags {
					id 
					created
					modified
					label
					description
					media
					mediaType
					color
					enabled
					floor {id,label}
					anchorPosition {x, y, z}
					discPosition {x, y, z}
					position {x, y, z}
					stemDirection {x, y, z}
					stemNormal {x, y, z}
					stemLength
					stemEnabled
				}
			}
		}`
    }
  })
    .then(result => {
      var data = result.data;
      if (data && data.data && data.data.model && data.data.model.mattertags != null) {
        res
          .status(200)
          .send({ success: true, data: data.data.model.mattertags });
      } else {
        res.status(200).send({ success: false, data: data, error: "no data" });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ success: false, error: error, data: [] });
    });
});

//add MatterTags
app.post("/api/mattertags", function(req, res) {
  let tagData = {
    spaceId: req.body.spaceId,
    floorId: req.body.floorId,
    color: req.body.color,
    enabled: req.body.enabled,
    label: req.body.label,
    description: req.body.description,
    anchorPosition: req.body.anchorPosition,
    mediaType: req.body.mediaType,
    mediaUrl: req.body.mediaUrl,
    stemEnabled: req.body.stemEnabled,
    stemNormal: req.body.stemNormal,
    stemLength: req.body.stemLength
  };

  axios({
    url: "https://api.matterport.com/api/models/graph",
    method: "post",
    headers: {
      Authorization:"Basic "+config.EnVar.AUTH_HEADER,
      "Content-Type": "application/json"
    },
    data: {
      query: `mutation{
        addMattertag(
            modelId: "${tagData.spaceId}",
            mattertag: {
                floorId:"${tagData.floorId}"
                color: "${tagData.color}",
                enabled: ${tagData.enabled},
                label: "${tagData.label}",
                description: "${tagData.description}",
                anchorPosition: {
                    x: ${tagData.anchorPosition.x},
                    y: ${tagData.anchorPosition.y},
                    z: ${tagData.anchorPosition.z}
                },
                mediaType:${tagData.mediaType ? tagData.mediaType : null}
                mediaUrl:"${tagData.mediaUrl && tagData.mediaUrl != null ? tagData.mediaUrl : ""}"
                stemEnabled: ${tagData.stemEnabled}
                stemNormal: {
                  x: ${tagData.stemNormal.x},
                  y: ${tagData.stemNormal.y},
                  z: ${tagData.stemNormal.z}
                },
                stemLength: ${tagData.stemLength},
            }
        ){
            id
            label
        } 
    }`
    }
  })
    .then(result => {
      var data = result.data;
      if (data && data.data.addMattertag && data.data.addMattertag.id != null) {
        res.status(200).send({ success: true, data: data.data.addMattertag });
      } else {
        res.status(200).send({ success: false, data: data, error: "no data" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ success: false, error: error, data: {} });
    });
});

//delete MatterTags
app.delete("/api/mattertags/:tagId/:spaceId", function(req, res) {
  let tagData = {
    spaceId: req.params.spaceId,
    tagId: req.params.tagId
  };

  axios({
    url: "https://api.matterport.com/api/models/graph",
    method: "post",
    headers: {
      Authorization:"Basic "+config.EnVar.AUTH_HEADER,
      "Content-Type": "application/json"
    },
    data: {
      query: `mutation{
        deleteMattertag(
            modelId: "${tagData.spaceId}",
            mattertagId: "${tagData.tagId}",
        )
         
    }`
    }
  })
    .then(result => {
      var data = result.data;
      

      if (data && data.data.deleteMattertag==true) {
        res.status(200).send({ success: true, data: {} });
      } else {
        res.status(200).send({ success: false, data: data, error: "no data" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ success: false, error: error, data: {} });
    });
});
//handle welcome
app.get("/api/ping", function(req, res) {
  res.send("welcome to " + config.EnVar.APP_NAME);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(config.EnVar.SERVER_PORT, function() {
  console.log("listening to " + config.EnVar.SERVER_PORT);
});
