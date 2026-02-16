let events = [];
let currentEventId = 1;

exports.createEvent = async (req, res) => {
  const newEvent = {
    id: currentEventId++,
    ...req.body
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
};

exports.getPlanningEvents = async (req, res) => {
  const planningEvents = events.filter(
    e => e.planning_id == req.params.planningId
  );

  res.json(planningEvents);
};

exports.updateEvent = async (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (!event) return res.status(404).json({ message: "Not found" });

  Object.assign(event, req.body);
  res.json(event);
};

exports.deleteEvent = async (req, res) => {
  events = events.filter(e => e.id != req.params.id);
  res.json({ message: "Deleted" });
};