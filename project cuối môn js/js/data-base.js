export const user = [
    {
        id: 1,
        firstname: "Lê",
        lastname: "Minh Thu",
        email: "minhthu@gmail.com",
        password: "123456",
        role: "user"
    },

    {
        id: 2,
        firstname: "Vũ",
        lastname: "Hồng Vân",
        email: "hongvan@yahoo.com",
        password: "abc123",
        role: "user"
    },

    {
        id: 3,
        firstname: "Tăng",
        lastname: "Hiếu Thành",
        email: "tht2107@gmail.com",
        password: "tht22102007",
        role: "admin"
    }
];

export const articles = [
    {
        id: 1,
        title: "Deadline đầu tiên của kỳ học",
        entries: "Daily Journal",
        content: "Hôm nay mình vừa nộp xong bài tập lớn. Mệt nhưng thấy rất nhẹ nhõm!",
        mood: "Căng thẳng",
        status: "Riêng tư",
        image: "https://picsum.photos/id/1015/400/250",
        date: "2025-02-23",
        entriesID: 1,
        userID: 2,
    },
    {
        id: 2,
        title: "Cà phê chiều chủ nhật",
        entries: "Work & Career",
        content: "Ngồi một mình trong quán quen, nghe nhạc lofi và viết vài dòng nhật ký...",
        mood: "Thư giãn",
        status: "Công khai",
        image: "https://picsum.photos/id/1025/400/250",
        date: "2025-03-15",
        entriesID: 2,
        userID: 1,
    },
];

export const entries = [
    {
        id: 1,
        categoryName: "Daily Journal",
    },
    {
        id: 2,
        categoryName: "Work & Career",
    },
    {
        id: 3,
        categoryName: "Personal Thoughts",
    },
    {
        id: 4,
        categoryName: "Emotions & Feelings",
    }
];

