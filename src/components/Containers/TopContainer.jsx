import React from 'react';

function TopContainer({children}) {
    return (
        <section id="cover" className="mt-4">
            <div id="cover-caption">
                <div className="container">
                    <div className="row text-white">
                        <div className="col-md-12">
                            <div className="px-2">
                                <form>
                                    {children}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
            )
}

export default TopContainer;