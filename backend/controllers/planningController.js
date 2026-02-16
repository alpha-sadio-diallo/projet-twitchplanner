let plannings = [];
let currentId = 1;

exports.createPlanning = async (req, res) => {
  const { name, start_date, end_date } = req.body;

  const newPlanning = {
    id: currentId++,
    name,
    start_date,
    end_date
  };

  plannings.push(newPlanning);
  res.status(201).json(newPlanning);
};

exports.getUserPlannings = async (req, res) => {
  res.json(plannings);
};

exports.updatePlanning = async (req, res) => {
  const planning = plannings.find(p => p.id == req.params.id);
  if (!planning) return res.status(404).json({ message: "Not found" });

  planning.name = req.body.name;
  planning.start_date = req.body.start_date;
  planning.end_date = req.body.end_date;

  res.json(planning);
};

exports.deletePlanning = async (req, res) => {
  plannings = plannings.filter(p => p.id != req.params.id);
  res.json({ message: "Deleted" });
};