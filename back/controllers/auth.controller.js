import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizePassword = (password) => {
  const trimmedPassword = password.trim();
  return trimmedPassword.replace(/[^\w\s]/gi, "");
};

const sanitizeUsername = (username) => {
  const trimmedUsername = username.trim();
  return trimmedUsername.replace(/[^\w\s]/gi, "");
};

const sanitizeEmail = (email) => {
  return email.trim();
};

const register = async (req, res) => {
  let { email, username, password } = req.body;

  const sanitizedPassword = sanitizePassword(password);
  const sanitizedUsername = sanitizeUsername(username);
  const sanitizedEmail = sanitizeEmail(email);

  if (!emailRegex.test(sanitizedEmail)) {
    return res.status(400).json({
      message: "Adresse email invalide.",
    });
  }

  if (!passwordRegex.test(sanitizedPassword)) {
    return res.status(400).json({
      message:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.",
    });
  }

  try {
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "L'email est déjà utilisé" });
    }

    const existingUsername = await User.findOne({
      username: sanitizedUsername,
    });
    if (existingUsername) {
      return res.status(400).json({ message: "Username déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);

    const user = new User({
      _id: Date.now(),
      email: sanitizedEmail,
      username: sanitizedUsername,
      password: hashedPassword,
      status: "standard" || req.body.status,
    });

    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la création de l'utilisateur" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const sanitizedEmail = sanitizeEmail(email);
  const sanitizedPassword = sanitizePassword(password);

  try {
    const user = await User.findOne({ email: sanitizedEmail });

    if (user && (await bcrypt.compare(sanitizedPassword, user.password))) {
      const token = jwt.sign(
        { _id: user._id, status: user.status },
        process.env.SECRET_TOKEN,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Utilisateur connecté avec succès",
        token,
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
        },
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur lors de la connexion" });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "Utilisateur déconnecté avec succès" });
};

const isConnected = async (req, res) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "Token non fourni" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({
      message: "Utilisateur connecté",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        status: user.status,
      },
    });
  } catch (err) {
    res.status(401).json({ message: "Échec de l'authentification du token." });
  }
};

export default {
  register,
  login,
  logout,
  isConnected,
};
