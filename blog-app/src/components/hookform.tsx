export default function hookform() {
  return (
    <>
      <label htmlFor="age">Age</label>
      <input
        type="number"
        id="age"
        {...register("age", {
          valueAsNumber: true,
          required: "Age is required.",
        })}
      />

      <label htmlFor="dob">Date of birth</label>
      <input
        type="date"
        id="dob"
        {...register("dob", {
          valueAsDate: true,
          required: "Date of birth is required.",
        })}
      />
    </>
  );
}
