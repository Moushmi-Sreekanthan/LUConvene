import React from 'react';
import "./events.css";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Event() {
  return (
    <div style={{ display: 'block', width: 900, padding: 30 }}>
     <Dropdown >
    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="danger">
    Educators' Career Fair on Nov. 9
    </Dropdown.Toggle>

    <Dropdown.Menu variant="danger">
      <Dropdown.Item href="#/action-1" variant="danger">
      Educators' Career Fair on Nov. 9
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#/action-4">
        <img src="../../pics/6.PNG"></img>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

  <Dropdown>
    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="danger">
    Homecoming Week Starts Today!
    </Dropdown.Toggle>

    <Dropdown.Menu variant="danger">
      <Dropdown.Item href="#/action-1" variant="danger">
      Cardinalpalooza 
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#/action-4">
        <img src="D:\project 2021\LU-Convene1\client\src\pics\1.PNG"></img>
        <img src="../../pics/2.PNG"></img>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

  <Dropdown>
    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="danger">
    Formal Investiture of Jaime R. Taylor
    </Dropdown.Toggle>

    <Dropdown.Menu variant="danger">
      <Dropdown.Item href="#/action-1" variant="danger">
      Formal Investiture of Jaime R. Taylor
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#/action-4">
        <img src="../../pics/3.PNG"></img>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

  <Dropdown>
    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="danger">
    Women's Volleyball vs Abilene Christian
    </Dropdown.Toggle>

    <Dropdown.Menu variant="danger">
      <Dropdown.Item href="#/action-1" variant="danger">
      Athletic Event
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#/action-4">
        <img src="../../pics/4.PNG"></img>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

  <Dropdown >
    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="danger">
    LU Black Alumni Network Homecoming Scholarship Gala
    </Dropdown.Toggle>

    <Dropdown.Menu variant="danger">
      <Dropdown.Item href="#/action-1" variant="danger">
      Alumni Event
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#/action-4">
        <img src="../../pics/5.PNG"></img>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  <Dropdown>
    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="danger">
    Be a Part of Project Gratitude
    </Dropdown.Toggle>

    <Dropdown.Menu variant="danger">
      <Dropdown.Item href="#/action-1" variant="danger">
      Be a Part of Project Gratitude
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#/action-4">
        <img src="../../pics/8.PNG"></img>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

  <Dropdown>
    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="danger">
    UNIDAD Scholars Presents: How S.M.A.R.T Are You: Goal Setting
    </Dropdown.Toggle>

    <Dropdown.Menu variant="danger">
      <Dropdown.Item href="#/action-1" variant="danger">
      UNIDAD Scholars Presents: How S.M.A.R.T Are You: Goal Setting
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#/action-4">
        <img src="../../pics/7.PNG"></img>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
    </div>
  );
}