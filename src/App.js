import React, { useState } from "react";
import { Button, Form, Table, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [students, setStudents] = useState([
    { name: "Nguyen Van A", code: "CODE12345", active: true },
    { name: "Tran Van B", code: "CODE67890", active: false },
  ]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [active, setActive] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleAddStudent = () => {
    if (!name || !code) return; // Không thêm nếu không nhập đủ thông tin
    const newStudent = { name, code, active };
    setStudents([newStudent, ...students]); // Thêm sinh viên mới vào đầu danh sách
    setName(""); // Xóa form sau khi thêm
    setCode("");
    setActive(false);
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index); // Xóa sinh viên theo chỉ mục
    setStudents(updatedStudents);
  };

  const handleSelectStudent = (index) => {
    const selected = selectedStudents.includes(index)
      ? selectedStudents.filter((i) => i !== index) // Nếu đã chọn, thì bỏ chọn
      : [...selectedStudents, index]; // Nếu chưa chọn, thì thêm vào danh sách đã chọn
    setSelectedStudents(selected);
  };

  const handleClear = () => {
    setStudents([]); // Xóa tất cả sinh viên
    setSelectedStudents([]); // Reset số lượng sinh viên được chọn
  };

  return (
    <div className="container">
      <Row className="my-3">
        <Col>
          <h4>Total Selected Student: {selectedStudents.length}</h4>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={handleClear}>
            Clear
          </Button>
        </Col>
      </Row>

      <Form>
        <Form.Group>
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Student Code</Form.Label>
          <Form.Control
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Still Active"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddStudent}>
          Add
        </Button>
      </Form>

      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>Select</th>
            <th>Student Name</th>
            <th>Student Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedStudents.includes(index)}
                  onChange={() => handleSelectStudent(index)}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.code}</td>
              <td>
                {student.active ? (
                  <Button variant="info" size="sm">
                    Active
                  </Button>
                ) : (
                  <Button variant="danger" size="sm">
                    Inactive
                  </Button>
                )}
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteStudent(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
