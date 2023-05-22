module.exports = (mongoose) => {
    const User = mongoose.model(
        'users',
        mongoose.Schema(
            {
                firstName: String,
                middleName: String,
                lastName: String,
                username: String,
                password: String,
                email: String,
                phone: String,
                juniorParticipants: Number,
                adultParticipants: Number,
            },
            { timestamps: true }
        )
    );

    return User;
}