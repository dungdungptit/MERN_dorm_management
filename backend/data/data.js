// 1. Nhập dữ liệu sinh viên
db.students.insertMany([
    {
        _id: "S001",
        name: "Nguyen Van A",
        identity_card: "123456789",
        birth_date: ISODate("2000-01-15"),
        class: "CNTT1",
        hometown: "Ha Noi",
        room_id: "R001",
        monthly_rent: 2000000,
        services_used: [
            {
                service_id: "SV001",
                service_name: "Giặt là",
                times_used: 5,
                total_cost: 50000,
                start_date: ISODate("2023-08-01"),
                end_date: ISODate("2023-08-31")
            },
            {
                service_id: "SV002",
                service_name: "Trông xe",
                times_used: 10,
                total_cost: 100000,
                start_date: ISODate("2023-08-01"),
                end_date: ISODate("2023-08-31")
            }
        ],
        guests: [
            {
                guest_id: "G001",
                name: "Tran Van B",
                identity_card: "987654321",
                visit_count: 2,
                visit_dates: [ISODate("2023-08-15"), ISODate("2023-08-20")]
            }
        ],
        total_amount_due: 2150000
    },
    {
        _id: "S002",
        name: "Le Thi C",
        identity_card: "223344556",
        birth_date: ISODate("2001-02-10"),
        class: "CNTT2",
        hometown: "Hai Phong",
        room_id: "R002",
        monthly_rent: 1500000,
        services_used: [
            {
                service_id: "SV003",
                service_name: "Ăn uống",
                times_used: 15,
                total_cost: 150000,
                start_date: ISODate("2023-08-01"),
                end_date: ISODate("2023-08-31")
            }
        ],
        guests: [],
        total_amount_due: 1650000
    }
]);

db.students.insertMany([
    {
        _id: "B24CHKH004",
        name: "Đặng Quang Dũng",
        identity_card: "012345678",
        birth_date: new Date("2001-10-10"),
        class: "Kỹ thuật phần mềm",
        hometown: "Hà Nội",
        room_id: "R001",
        monthly_rent: 1500000,
        services_used: [
            {
                service_id: "S001",
                service_name: "Giặt là",
                times_used: 5,
                total_cost: 100000,
                start_date: new Date("2023-07-01"),
                end_date: new Date("2023-07-31")
            },
            {
                service_id: "S002",
                service_name: "Trông xe",
                times_used: 10,
                total_cost: 50000,
                start_date: new Date("2023-07-01"),
                end_date: new Date("2023-07-31")
            }
        ],
        guests: [
            {
                guest_id: "G001",
                name: "Nguyễn Văn B",
                identity_card: "987654321",
                birth_date: new Date("1995-04-12"),
                visit_count: 3,
                visit_dates: [new Date("2023-07-01"), new Date("2023-07-15"), new Date("2023-07-20")]
            }
        ],
        monthly_parking_ticket: {
            vehicles: [
                {
                    license_plate: "29A-12345",
                    free_entries_left: 3,
                    entries: [
                        { entry_time: new Date("2023-07-01T08:00:00"), exit_time: new Date("2023-07-01T18:00:00"), extra_fee: 0 }
                    ]
                }
            ]
        },
        total_amount_due: 1650000
    },
    {
        _id: "B19DCCN084",
        name: "Nguyễn Mạng Cường",
        identity_card: "123456789",
        birth_date: new Date("2000-11-05"),
        class: "Khoa học máy tính",
        hometown: "Hải Phòng",
        room_id: "R002",
        monthly_rent: 1600000,
        services_used: [
            {
                service_id: "S003",
                service_name: "Cho thuê xe",
                times_used: 2,
                total_cost: 200000,
                start_date: new Date("2023-07-01"),
                end_date: new Date("2023-07-31")
            },
            {
                service_id: "S004",
                service_name: "Ăn uống",
                times_used: 15,
                total_cost: 300000,
                start_date: new Date("2023-07-01"),
                end_date: new Date("2023-07-31")
            }
        ],
        guests: [
            {
                guest_id: "G002",
                name: "Lê Văn C",
                identity_card: "654321987",
                birth_date: new Date("1996-03-20"),
                visit_count: 2,
                visit_dates: [new Date("2023-07-10"), new Date("2023-07-25")]
            }
        ],
        total_amount_due: 2100000
    },
    {
        _id: "B20DCCN101",
        name: "Bùi Văn Tùng",
        identity_card: "789456123",
        birth_date: new Date("2001-06-18"),
        class: "Công nghệ thông tin",
        hometown: "Nam Định",
        room_id: "R003",
        monthly_rent: 1550000,
        services_used: [
            {
                service_id: "S001",
                service_name: "Giặt là",
                times_used: 7,
                total_cost: 140000,
                start_date: new Date("2023-07-01"),
                end_date: new Date("2023-07-31")
            }
        ],
        guests: [
            {
                guest_id: "G003",
                name: "Trần Thị D",
                identity_card: "789123456",
                birth_date: new Date("1998-05-10"),
                visit_count: 1,
                visit_dates: [new Date("2023-07-15")]
            }
        ],
        total_amount_due: 1690000
    },
    {
        _id: "B25DCAT206",
        name: "Trần Quang Minh",
        identity_card: "741852963",
        birth_date: new Date("2002-02-22"),
        class: "An toàn thông tin",
        hometown: "Thanh Hóa",
        room_id: "R004",
        monthly_rent: 1700000,
        services_used: [
            {
                service_id: "S002",
                service_name: "Trông xe",
                times_used: 12,
                total_cost: 60000,
                start_date: new Date("2023-07-01"),
                end_date: new Date("2023-07-31")
            }
        ],
        guests: [],
        total_amount_due: 1760000
    },
    {
        _id: "B25DCCN106",
        name: "Nguyễn Minh Hiếu",
        identity_card: "852963741",
        birth_date: new Date("2002-09-14"),
        class: "Công nghệ thông tin",
        hometown: "Nghệ An",
        room_id: "R005",
        monthly_rent: 1600000,
        services_used: [
            {
                service_id: "S003",
                service_name: "Cho thuê xe",
                times_used: 3,
                total_cost: 300000,
                start_date: new Date("2023-07-01"),
                end_date: new Date("2023-07-31")
            }
        ],
        guests: [
            {
                guest_id: "G004",
                name: "Phạm Văn E",
                identity_card: "963741852",
                birth_date: new Date("1997-12-12"),
                visit_count: 2,
                visit_dates: [new Date("2023-07-18"), new Date("2023-07-30")]
            }
        ],
        total_amount_due: 1900000
    },
    {
        _id: "B16DCCN230",
        name: "Nguyễn Đình Đạt",
        identity_card: "963258741",
        birth_date: new Date("1998-04-02"),
        class: "Khoa học dữ liệu",
        hometown: "Quảng Ninh",
        room_id: "R006",
        monthly_rent: 1800000,
        services_used: [
            {
                service_id: "S004",
                service_name: "Ăn uống",
                times_used: 20,
                total_cost: 400000,
                start_date: new Date("2023-07-01"),
                end_date: new Date("2023-07-31")
            }
        ],
        guests: [],
        total_amount_due: 2200000
    }
]);


// 2. Nhập dữ liệu phòng
db.rooms.insertMany([
    { _id: "R001", room_type: "Phòng đơn", monthly_rent: 2000000, max_occupants: 1, occupants: ["S001"] },
    { _id: "R002", room_type: "Phòng đôi", monthly_rent: 1500000, max_occupants: 2, occupants: ["S002"] }
]);

db.rooms.insertMany([
    { _id: "R003", room_type: "Phòng đơn", monthly_rent: 1550000, max_occupants: 1, occupants: ["B20DCCN101"] },
    { _id: "R004", room_type: "Phòng đơn", monthly_rent: 1700000, max_occupants: 1, occupants: ["B25DCAT206"] },
    { _id: "R005", room_type: "Phòng đôi", monthly_rent: 1600000, max_occupants: 2, occupants: ["B25DCCN106", "B19DCCN084"] },
    { _id: "R006", room_type: "Phòng đôi", monthly_rent: 1800000, max_occupants: 2, occupants: ["B16DCCN230", "B24CHKH004"] }
]);


// 3. Nhập dữ liệu dịch vụ
db.services.insertMany([
    { _id: "S001", service_name: "Giặt là", price: 20000, monthly_revenue: 0 },
    { _id: "S002", service_name: "Trông xe", price: 5000, monthly_revenue: 0 },
    { _id: "S003", service_name: "Cho thuê xe", price: 100000, monthly_revenue: 0 },
    { _id: "S004", service_name: "Ăn uống", price: 20000, monthly_revenue: 0 }
]);


// 4. Nhập dữ liệu khách
db.guests.insertMany([
    { _id: "G001", name: "Tran Van B", identity_card: "987654321", birth_date: ISODate("1999-10-12"), visits: [{ student_id: "S001", visit_dates: [ISODate("2023-08-15"), ISODate("2023-08-20")] }] }
]);

db.guests.insertMany([
    { _id: "G005", name: "Nguyễn Văn B", identity_card: "987654321", birth_date: new Date("1995-04-12"), visits: [{ student_id: "B24CHKH004", visit_dates: [new Date("2023-07-01"), new Date("2023-07-15"), new Date("2023-07-20")] }] },
    { _id: "G002", name: "Lê Văn C", identity_card: "654321987", birth_date: new Date("1996-03-20"), visits: [{ student_id: "B19DCCN084", visit_dates: [new Date("2023-07-10"), new Date("2023-07-25")] }] },
    { _id: "G003", name: "Trần Thị D", identity_card: "789123456", birth_date: new Date("1998-05-10"), visits: [{ student_id: "B20DCCN101", visit_dates: [new Date("2023-07-15")] }] },
    { _id: "G004", name: "Phạm Văn E", identity_card: "963741852", birth_date: new Date("1997-12-12"), visits: [{ student_id: "B25DCCN106", visit_dates: [new Date("2023-07-18"), new Date("2023-07-30")] }] }
]);


// 5. Nhập dữ liệu gửi xe
db.parking.insertMany([
    {
        vehicle_id: "V001",
        license_plate: "29A-12345",
        student_id: "S001",
        entries: [
            { take_time: ISODate("2023-08-01T08:00:00Z"), return_time: ISODate("2023-08-01T18:00:00Z"), fee: 0 },
            { take_time: ISODate("2023-08-02T08:00:00Z"), return_time: ISODate("2023-08-02T18:00:00Z"), fee: 3000 }
        ],
        monthly_ticket: { active: true, free_entries: 2 }
    }
]);

db.parkings.insertMany([
    { vehicle_id: "V001", license_plate: "29A-12345", student_id: "B24CHKH004", entries: [{ entry_time: new Date("2023-07-01T08:00:00"), exit_time: new Date("2023-07-01T18:00:00"), extra_fee: 0 }], monthly_ticket: { free_entries_left: 3, extra_fees: 0 } }
]);
