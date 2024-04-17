describe("connect to test db", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("input entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES 
      (1, 'Ivan', '02-2022', 'Barcelona'), 
      (2, 'Maria', '03-2022', 'Tokio'),
      (3, 'Andrey', '02-2023', 'Milan'),
      (4, 'Svetlana', '06-2024','Belgrage'),
      (5,'Stepan', '05-2024','Athens');`
    );
  });
  it("select students from Milan", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE City = "Milan"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
    });
  });
  it("select all students", () => {
    cy.task("queryDb", "SELECT FirstName FROM Students").then((result) => {
      cy.log(JSON.stringify(result));
    });
  });
  it("can delete the db", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
