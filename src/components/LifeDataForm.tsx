/**
 * Form component for collecting initial life data
 * Collects: birthdate, school years, career dates
 */

import { useState } from "react";
import { User, LifeEntry } from "../domain/types";
import {
  createEducationEntry,
  createWorkEntry,
} from "../domain/life-entry-creation";

interface SchoolEntry {
  name: string;
  startDate: string;
  endDate: string;
}

interface CareerEntry {
  title: string;
  startDate: string;
  endDate: string;
}

interface LifeDataFormProps {
  onSubmit: (user: User, entries: LifeEntry[]) => void;
}

export function LifeDataForm({ onSubmit }: LifeDataFormProps) {
  const [birthdate, setBirthdate] = useState("");
  const [lifespan, setLifespan] = useState(80);
  const [schools, setSchools] = useState<SchoolEntry[]>([]);
  const [careers, setCareers] = useState<CareerEntry[]>([]);

  const handleAddSchool = () => {
    setSchools([...schools, { name: "", startDate: "", endDate: "" }]);
  };

  const handleRemoveSchool = (index: number) => {
    setSchools(schools.filter((_school, i) => i !== index));
  };

  const handleUpdateSchool = (
    index: number,
    field: keyof SchoolEntry,
    value: string
  ) => {
    const updated = [...schools];
    updated[index] = { ...updated[index], [field]: value };
    setSchools(updated);
  };

  const handleAddCareer = () => {
    setCareers([...careers, { title: "", startDate: "", endDate: "" }]);
  };

  const handleRemoveCareer = (index: number) => {
    setCareers(careers.filter((_career, i) => i !== index));
  };

  const handleUpdateCareer = (
    index: number,
    field: keyof CareerEntry,
    value: string
  ) => {
    const updated = [...careers];
    updated[index] = { ...updated[index], [field]: value };
    setCareers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthdate) {
      alert("Please enter your date of birth");
      return;
    }

    const user: User = {
      dateOfBirth: new Date(birthdate),
      expectedLifespanYears: lifespan,
    };

    const entries: LifeEntry[] = [];

    // Convert schools to education entries
    schools.forEach((school: SchoolEntry) => {
      if (school.name && school.startDate) {
        entries.push(
          createEducationEntry(
            school.name,
            new Date(school.startDate),
            school.endDate ? new Date(school.endDate) : undefined
          )
        );
      }
    });

    // Convert careers to work entries
    careers.forEach((career: CareerEntry) => {
      if (career.title && career.startDate) {
        entries.push(
          createWorkEntry(
            career.title,
            new Date(career.startDate),
            career.endDate ? new Date(career.endDate) : undefined
          )
        );
      }
    });

    onSubmit(user, entries);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem" }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Your Life in 4,000 Weeks</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
          }}
        >
          Date of Birth *
        </label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
          }}
        >
          Expected Lifespan (years)
        </label>
        <input
          type="number"
          value={lifespan}
          onChange={(e) => setLifespan(parseInt(e.target.value, 10) || 80)}
          min="1"
          max="120"
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Education</h2>
          <button
            type="button"
            onClick={handleAddSchool}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add School
          </button>
        </div>

        {schools.map((school, index) => (
          <div
            key={index}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <h3 style={{ fontSize: "1rem", fontWeight: "500" }}>
                School #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => handleRemoveSchool(index)}
                style={{
                  padding: "0.25rem 0.5rem",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="School name"
              value={school.name}
              onChange={(e) =>
                handleUpdateSchool(index, "name", e.target.value)
              }
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.5rem",
              }}
            >
              <input
                type="date"
                placeholder="Start date"
                value={school.startDate}
                onChange={(e) =>
                  handleUpdateSchool(index, "startDate", e.target.value)
                }
                style={{
                  padding: "0.5rem",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <input
                type="date"
                placeholder="End date (optional)"
                value={school.endDate}
                onChange={(e) =>
                  handleUpdateSchool(index, "endDate", e.target.value)
                }
                style={{
                  padding: "0.5rem",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Career</h2>
          <button
            type="button"
            onClick={handleAddCareer}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Job
          </button>
        </div>

        {careers.map((career, index) => (
          <div
            key={index}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <h3 style={{ fontSize: "1rem", fontWeight: "500" }}>
                Job #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => handleRemoveCareer(index)}
                style={{
                  padding: "0.25rem 0.5rem",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="Job title"
              value={career.title}
              onChange={(e) =>
                handleUpdateCareer(index, "title", e.target.value)
              }
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.5rem",
              }}
            >
              <input
                type="date"
                placeholder="Start date"
                value={career.startDate}
                onChange={(e) =>
                  handleUpdateCareer(index, "startDate", e.target.value)
                }
                style={{
                  padding: "0.5rem",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <input
                type="date"
                placeholder="End date (optional)"
                value={career.endDate}
                onChange={(e) =>
                  handleUpdateCareer(index, "endDate", e.target.value)
                }
                style={{
                  padding: "0.5rem",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1.125rem",
          fontWeight: "600",
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Generate Life Visualization
      </button>
    </form>
  );
}
