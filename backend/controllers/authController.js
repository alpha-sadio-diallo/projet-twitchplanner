let users = [];
let currentUserId = 1;

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Utilisateur déjà existant" });
  }

  const newUser = {
    id: currentUserId++,
    email,
    password
  };

  users.push(newUser);

  res.status(201).json({
    message: "Compte créé avec succès",
    user: { id: newUser.id, email: newUser.email }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  res.json({
    message: "Connexion réussie",
    user: { id: user.id, email: user.email }
  });
};