import React from "react";

const Dashboard = () => {
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-lg-9 col-md-8 col-12">
          <div className="bg-white rounded-3 p-3 mb-3 shadow-sm">
            <div className="row g-3">
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card bg-primary-subtle text-primary shadow-sm rounded-3">
                  <div className="card-body text-center">
                    <h6 className="card-title">Projects</h6>
                    <h4 className="card-text fw-bold fs-1">12</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card bg-info-subtle text-info shadow-sm rounded-3">
                  <div className="card-body text-center">
                    <h6 className="card-title">Tasks</h6>
                    <h4 className="card-text fw-bold fs-1">24</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card bg-success-subtle text-success shadow-sm rounded-3">
                  <div className="card-body text-center">
                    <h6 className="card-title">Completed</h6>
                    <h4 className="card-text fw-bold fs-1">18</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card bg-warning-subtle text-warning shadow-sm rounded-3">
                  <div className="card-body text-center">
                    <h6 className="card-title">Pending</h6>
                    <h4 className="card-text fw-bold fs-1">5</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card bg-danger-subtle text-danger shadow-sm rounded-3">
                  <div className="card-body text-center">
                    <h6 className="card-title">Overdue</h6>
                    <h4 className="card-text fw-bold fs-1">1</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card" style={{ backgroundColor: '#fdb890ff', color: '#ee5c08ff' }}>
                  <div className="card-body text-center">
                    <h6 className="card-title">In Progress</h6>
                    <h4 className="card-text fw-bold fs-1">7</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3 p-3 shadow-sm">
            <h5 className="mb-2">Left Side 2</h5>
            <p className="text-muted mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam voluptatem voluptas beatae atque! Incidunt aliquid error repudiandae distinctio quidem rerum quas qui voluptatum vel repellendus, fuga debitis vitae deserunt nemo? Provident non, quam officiis est voluptatibus animi officia obcaecati, dicta odit dolore quis recusandae hic impedit nihil, ex placeat. Sapiente accusantium quidem voluptas ab debitis doloribus reiciendis et repellat eligendi praesentium omnis dolor labore, veritatis iusto quia soluta, tempora, provident nesciunt. Assumenda saepe ipsum magni minima incidunt, nemo eligendi eveniet vero excepturi modi unde ipsa natus totam? Sint maiores nesciunt quia atque ea distinctio iure adipisci nobis omnis aut! Possimus eveniet asperiores inventore consequatur minus! Eveniet, quia atque id quidem explicabo, deleniti quas fugiat saepe sint deserunt maxime quos molestias laboriosam obcaecati facilis dolores accusamus, iste velit numquam aperiam! Iure quia nobis nesciunt entore? Vero suscipit obcaecati dolorum, ipsum accusantium modi ullam eaque porro cupiditate commodi nostrum, magnam eveniet accusamus sapiente eius tenetur. Officiis doloremque ratione voluptates tempore quasi laborum vel! Praesentium consequatur aliquam, blanditiis id dolore cum aut accusamus ab ipsum eos ea, ad laborum illo nihil alias optio? Incidunt quaerat magnam non recusandae esse, sint dolores quas in totam iusto aperiam aliquam eos dignissimos debitis maxime optio modi commodi ipsam vero, eum laboriosam quibusdam dolor illum voluptas? A, et nam!</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-12 mt-3 mt-md-0">
          <div className="bg-white rounded-3 p-3 shadow-sm h-100">
            <h5 className="mb-2">Right Side</h5>
            <p className="text-muted mb-0">Sidebar or additional details go here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
