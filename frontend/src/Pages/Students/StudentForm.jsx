import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import StudentAPI from "../../API/students";

function StudentForm({ show, handleClose, studentId = null }) {
  const defaultStudent = {
    rollNo: "",
    firstName: "",
    lastName: "",
    address: "",
    gender: "",
    subjects: [""],
  };

  const [student, setStudent] = useState(defaultStudent);

  useEffect(() => {
    if (studentId) {
      StudentAPI.show(studentId)
        .then((res) => {
          const { data } = res;
          setStudent(data.student);
        })
        .catch((err) => {});
    }
  }, [studentId]);

  const handleSubjectAdd = () => {
    const newSubject = [...student.subjects];
    newSubject.push("");
    setStudent({ ...student, subjects: newSubject });
  };

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const newSubject = [...student.subjects];
      newSubject[index] = e.target.value;
      setStudent({ ...student, subjects: newSubject });
      return;
    } else {
      const { name, value } = e.target;
      setStudent({ ...student, [name]: value });
    }
  };

  const onSubmit = () => {
    if (studentId) {
      StudentAPI.update(studentId, student)
        .then((res) => {
          handleClose();
        })
        .catch((err) => {
          alert("Something went wrong");
        });
    } else {
      StudentAPI.create(student)
        .then((res) => {
          handleClose();
        })
        .catch((err) => {
          alert("Something went wrong");
        });
    }
  };

  const onClose = () => {
    setStudent(defaultStudent);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="RollNo">
            <Form.Label>RollNo</Form.Label>
            <Form.Control
              type="number"
              name="rollNo"
              placeholder="RollNo"
              value={student.rollNo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={student.firstName}
              placeholder="firstName"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="lastName"
              value={student.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              value={student.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="subjects">
            <Form.Label>Subjects</Form.Label>
            {(student?.subjects ?? [""]).map((item, index) => {
              return (
                <Form.Control
                  key={index}
                  type="text"
                  placeholder="subject"
                  value={item}
                  className="mb-2"
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                />
              );
            })}
            <Button
              className="btn btn-warning w-100"
              onClick={handleSubjectAdd}
            >
              +
            </Button>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Gender">
            <Form.Label>Gender</Form.Label>
            <select
              className="form-select"
              name="gender"
              onChange={handleChange}
              defaultValue={student.gender}
            >
              <option value={""}>--Select--</option>
              {["Male", "Female", "Other"].map((item) => {
                return <option key={item}>{item}</option>;
              })}
            </select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StudentForm;
