// Import the Company model and Sequelize
import Company from "../models/Company.entity.js";
import PendingAccount from "../models/pendingAccount.js";
import CompanyProfile from "../models/companyprofile.entity.js";
import CompanyLogo from "../models/CompanyLogo.entity.js";
import JobPost from "../models/JobPost.entity.js";
import argon2 from "argon2";
import { Sequelize } from "sequelize";

// Controller functions
const CompanyController = {
  // Create a new Company
  async createCompany(req, res) {
    try {
      const existingCompany = await Company.findOne({
        where: { Email: req.body.Email.toLowerCase() },
      });
      if (existingCompany) {
        return res
          .status(400)
          .json({ error: "Company with this email already exists" });
      }

      req.body.password = await argon2.hash(req.body.password);

      const newCompany = await Company.create(req.body);

      await PendingAccount.deleteOne({ email: req.body.Email.toLowerCase() });

      return res.status(201).json(newCompany);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get all Companies
  async getCompanies(req, res) {
    try {
      const Companies = await Company.findAndCountAll({
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                SELECT COUNT(*)
                FROM JobPosts AS jobPosts
                WHERE jobPosts.CompanyId = Company.id
              )`),
              "jobPostCount",
            ],
          ],
        },
        include: [
          {
            model: CompanyLogo,
            as: "CompanyLogo", // Make sure this matches the alias used in your association definition
          },
        ],
      });
      return res.status(200).json(Companies);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get a Company by ID
  async getCompanyById(req, res) {
    const { id } = req.params;
    try {
      const CompanyRecord = await Company.findByPk(id, {
        include: [
          { model: CompanyProfile, as: "CompanyProfile" },
          { model: CompanyLogo, as: "CompanyLogo" },
        ],
      });
      if (!CompanyRecord) {
        return res.status(404).json({ message: "Company not found" });
      }
      return res.status(200).json(CompanyRecord);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Update a Company
  async updateCompany(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
      if (req.body.password) {
        req.body.password = await argon2.hash(req.body.password);
      }

      const [updatedRowsCount, updatedCompany] = await Company.update(body, {
        where: { id },
        returning: true, // Return the updated Company object
      });
      if (updatedRowsCount === 0) {
        return res.status(404).json({ message: "Company not found" });
      }
      return res.status(200).json(updatedCompany);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Delete an Company
  async deleteCompany(req, res) {
    const { id } = req.params;
    try {
      const deletedRowCount = await Company.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        return res.status(404).json({ message: "Company not found" });
      }
      return res.status(204).end(); // No content response
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default CompanyController;
