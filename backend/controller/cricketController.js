const { Cricketer } = require("../model/userModel");
const { Op } = require("sequelize");


const addDetails = async (req, res) => {
  try {
    const { name, dob, url, birth_place, description, no_of_matches } =
      req.body;

    const crickter = await Cricketer.create({
      name: name,
      dob: dob,
      url: url,
      birth_place: birth_place,
      description: description,
      no_of_matches: no_of_matches,
    });

    res.status(201).json(crickter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cannot be created" });
  }
};

const getDetails = async (req, res) => {
  try {
    const allUsers = await Cricketer.findAll();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDetailsWithId = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await Cricketer.findByPk(id)

        if(!user){
            res.status(404).json({message:"User not found"})

        }
        res.status(200).json(user)
    } catch (error) {
        
    }
}

const updateDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dob, url, birth_place, description, no_of_matches } =
      req.body;

    const user = await Cricketer.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.set({
      name: name,
      dob: dob,
      url: url,
      birth_place: birth_place,
      description: description,
      no_of_matches: no_of_matches,
    });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Problem in update details" });
  }
};


const searchUser = async (req, res) => {
  try {
    const filters = {};

    
    for (const key in req.query) {
      if (req.query[key]) {
        filters[key] = {
          [Op.like]: `%${req.query[key]}%`,
        };
      }
    }

    const result = await Cricketer.findAll({
      where: filters,
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

module.exports = { addDetails, getDetails, updateDetails, getDetailsWithId, searchUser };
