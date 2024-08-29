import User from "../models/User.js";
import jwt from "jsonwebtoken";

const getOneUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token non fourni" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    if (user._id.toString() !== decodedToken._id.toString()) {
      return res.status(401).json({ message: "Accès non autoriséa" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token invalide" });
  }
};

const updateOneUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (user._id.toString() !== decodedToken._id.toString()) {
      return res
        .status(401)
        .json({ message: "Vous n'êtes pas autorisé à effectuer cette action" });
    }

    Object.assign(user, req.body);

    const updatedUser = await user.save();
    res
      .status(200)
      .json({ message: "Utilisateur mis à jour avec succès", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token invalide" });
  }
};
const deleteOneUser = (req, res, next) => {
  const token = req.headers.authorization;

  const authToken = token.split(" ")[1];

  try {
    const decodedToken = jwt.verify(authToken, process.env.SECRET_TOKEN);
    const decodedTokenId = decodedToken._id;

    User.findOne({ _id: req.params.id }).then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Vous n'êtes pas autorisé à effectuer cette action",
        });
      }

      if (user._id.toString() !== decodedTokenId) {
        return res.status(401).json({
          message: "Vous n'êtes pas authorisés à faire cette action",
        });
      } else {
        User.deleteOne({ _id: req.params.id })
          .then(() => {
            return res
              .status(200)
              .json({ message: "Compte supprimé avec succès" });
          })
          .catch((error) => {
            console.error(error);
            return res.status(500).json({ message: error });
          });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalide" });
  }
};

export default {
  getOneUser,
  updateOneUser,
  deleteOneUser,
};
